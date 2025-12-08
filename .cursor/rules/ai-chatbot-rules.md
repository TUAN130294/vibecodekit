# AI Chatbot Development Rules

## 🤖 Dành riêng cho phát triển chatbot/AI features

---

## 1. Prompt Engineering Best Practices

### Cấu trúc prompt chuẩn:

```typescript
/**
 * 🔒 PROTECTED: System Prompt Template
 *
 * This prompt is tuned for our specific use case.
 * DO NOT change without A/B testing.
 */

const SYSTEM_PROMPT = `
Bạn là chatbot hỗ trợ về SOP (Standard Operating Procedure).

# Vai trò
[Role definition - PROTECTED]

# Nguyên tắc
1. [Rule 1 - PROTECTED]
2. [Rule 2 - PROTECTED]

# Cách trả lời
- [Format - PROTECTED]

# Không được
- [Restrictions - PROTECTED]
`;

// ⚠️ DO NOT:
// - Simplify this prompt
// - Remove any rules
// - Change structure
//
// ✅ CAN:
// - Add new examples (append to end)
// - Improve wording (if meaning unchanged)
```

---

## 2. RAG (Retrieval-Augmented Generation) Rules

### Context Building:

```typescript
/**
 * 🔒 PROTECTED: RAG Context Builder
 *
 * This function builds context for the AI.
 * Logic is tuned for:
 * - Relevance
 * - Token efficiency
 * - Accuracy
 */

async function buildRAGContext(query: string): Promise<string> {
  // 🔒 STEP 1: Search (DO NOT SKIP)
  const results = await vectorSearch(query, {
    limit: 5,              // 🔒 Tuned for accuracy
    threshold: 0.7,        // 🔒 Filters irrelevant results
  });

  // 🔒 STEP 2: Fallback (CRITICAL for user experience)
  if (results.length === 0) {
    // DO NOT return empty string
    // This causes hallucination
    return getDefaultHelpfulContext();
  }

  // 🔒 STEP 3: Format (PRESERVE structure)
  return results
    .map((doc, i) => `
=== Document ${i + 1}: ${doc.title} ===
${doc.content}

Metadata: Created ${doc.createdAt}, Updated ${doc.updatedAt}
    `)
    .join('\n\n');
}

// ⚠️ Common mistakes to AVOID:
// ❌ Don't return empty string when no results
// ❌ Don't skip metadata (helps AI understand recency)
// ❌ Don't change format (AI is trained on this structure)
```

---

## 3. Error Handling for AI Calls

```typescript
/**
 * 🔒 PROTECTED: AI Call with Retry Logic
 *
 * This handles OpenAI API errors gracefully.
 * Each retry strategy is necessary for different error types.
 */

async function callAI(prompt: string): Promise<string> {
  const MAX_RETRIES = 3;
  let lastError: Error;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,     // 🔒 Low for consistency
        max_tokens: 500,      // 🔒 Cost control
      });

      return response.choices[0].message.content || '';

    } catch (error) {
      lastError = error;

      // 🔒 CRITICAL: Different retry logic for different errors
      if (error.code === 'rate_limit_exceeded') {
        // Wait longer for rate limits
        await sleep(attempt * 5000);
      } else if (error.code === 'timeout') {
        // Quick retry for timeouts
        await sleep(1000);
      } else {
        // Don't retry for other errors
        break;
      }
    }
  }

  // 🔒 FALLBACK: Never fail silently
  console.error('AI call failed after retries:', lastError);
  return getFallbackResponse();
}

// ⚠️ DO NOT:
// ❌ Remove retry logic (causes production issues)
// ❌ Return empty string on error (breaks UX)
// ❌ Remove fallback (always have backup)
```

---

## 4. Token Counting & Cost Control

```typescript
/**
 * 🔒 PROTECTED: Token Management
 *
 * Prevents excessive API costs.
 * Budget: $100/month = ~2M tokens
 */

import { encode } from 'gpt-tokenizer';

const TOKEN_LIMITS = {
  maxContextTokens: 3000,      // 🔒 Prevents overload
  maxResponseTokens: 500,      // 🔒 Cost control
  maxTotalTokens: 4000,        // 🔒 Safety limit
};

function truncateContext(context: string): string {
  const tokens = encode(context);

  if (tokens.length <= TOKEN_LIMITS.maxContextTokens) {
    return context;
  }

  // 🔒 SMART TRUNCATION: Keep beginning and end
  const keepStart = Math.floor(TOKEN_LIMITS.maxContextTokens * 0.7);
  const keepEnd = TOKEN_LIMITS.maxContextTokens - keepStart;

  const truncated = [
    ...tokens.slice(0, keepStart),
    // Add truncation marker
    ...encode('\n\n... [truncated] ...\n\n'),
    ...tokens.slice(-keepEnd),
  ];

  return decode(truncated);
}

// ⚠️ DO NOT:
// ❌ Increase limits without budget approval
// ❌ Remove truncation (causes cost spikes)
// ❌ Skip token counting (blindly sends data)
```

---

## 5. Conversation State Management

```typescript
/**
 * 🔒 PROTECTED: Conversation History
 *
 * Maintains context across multiple messages.
 */

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

class ConversationManager {
  private history: Map<string, Message[]> = new Map();

  // 🔒 PROTECTED: History length control
  private readonly MAX_HISTORY = 10;  // Last 10 messages

  addMessage(sessionId: string, message: Message) {
    const history = this.history.get(sessionId) || [];
    history.push(message);

    // 🔒 CRITICAL: Limit history to prevent token overflow
    if (history.length > this.MAX_HISTORY) {
      // Keep first message (context) and recent messages
      this.history.set(sessionId, [
        history[0],  // First message (important context)
        ...history.slice(-this.MAX_HISTORY + 1),
      ]);
    } else {
      this.history.set(sessionId, history);
    }
  }

  getHistory(sessionId: string): Message[] {
    return this.history.get(sessionId) || [];
  }

  // 🔒 PROTECTED: Clear old sessions (memory management)
  clearOldSessions() {
    const ONE_HOUR = 60 * 60 * 1000;
    const now = Date.now();

    for (const [sessionId, messages] of this.history.entries()) {
      const lastMessage = messages[messages.length - 1];
      if (now - lastMessage.timestamp.getTime() > ONE_HOUR) {
        this.history.delete(sessionId);
      }
    }
  }
}

// ⚠️ DO NOT:
// ❌ Store unlimited history (memory leak)
// ❌ Remove first message (loses context)
// ❌ Skip cleanup (memory grows forever)
```

---

## 6. Response Validation

```typescript
/**
 * 🔒 PROTECTED: Validate AI Response
 *
 * Ensures AI output is safe and useful.
 */

function validateAIResponse(response: string): {
  valid: boolean;
  reason?: string;
  sanitized: string;
} {
  // 🔒 CHECK 1: Not empty
  if (!response || response.trim().length === 0) {
    return {
      valid: false,
      reason: 'Empty response',
      sanitized: 'Xin lỗi, tôi không thể tạo câu trả lời. Vui lòng thử lại.',
    };
  }

  // 🔒 CHECK 2: No hallucination markers
  const hallucinations = [
    'I don\'t have access',
    'I cannot see',
    'As an AI',
    'I apologize, but I don\'t',
  ];

  for (const marker of hallucinations) {
    if (response.includes(marker)) {
      return {
        valid: false,
        reason: 'Hallucination detected',
        sanitized: 'Xin lỗi, tôi không tìm thấy thông tin phù hợp. Bạn có thể hỏi cụ thể hơn không?',
      };
    }
  }

  // 🔒 CHECK 3: Length reasonable
  if (response.length < 10) {
    return {
      valid: false,
      reason: 'Response too short',
      sanitized: 'Bạn có thể hỏi cụ thể hơn để tôi có thể hỗ trợ tốt hơn?',
    };
  }

  // 🔒 SANITIZE: Remove unsafe content
  const sanitized = response
    .replace(/<script[^>]*>.*?<\/script>/gi, '')  // Remove scripts
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')  // Remove iframes
    .trim();

  return {
    valid: true,
    sanitized,
  };
}

// ⚠️ DO NOT:
// ❌ Skip validation (security risk)
// ❌ Return raw AI output (may contain unsafe content)
// ❌ Remove hallucination checks (poor UX)
```

---

## 7. Testing Requirements

```typescript
/**
 * 🔒 PROTECTED: Bot Testing Suite
 *
 * All tests must pass before deployment.
 */

describe('🤖 Chatbot Core Logic', () => {
  describe('RAG Context Building', () => {
    test('returns default context when no results', async () => {
      const context = await buildRAGContext('非存在的查询');
      expect(context).not.toBe('');
      expect(context).toContain('Tôi có thể giúp');
    });

    test('includes metadata in context', async () => {
      const context = await buildRAGContext('test query');
      expect(context).toContain('Created');
      expect(context).toContain('Updated');
    });
  });

  describe('Error Handling', () => {
    test('retries on rate limit error', async () => {
      // Mock OpenAI to fail twice then succeed
      mockOpenAI.mockRejectedValueOnce({ code: 'rate_limit_exceeded' });
      mockOpenAI.mockRejectedValueOnce({ code: 'rate_limit_exceeded' });
      mockOpenAI.mockResolvedValueOnce({ choices: [{ message: { content: 'success' } }] });

      const result = await callAI('test');
      expect(result).toBe('success');
      expect(mockOpenAI).toHaveBeenCalledTimes(3);
    });

    test('returns fallback on complete failure', async () => {
      mockOpenAI.mockRejectedValue(new Error('API down'));
      const result = await callAI('test');
      expect(result).toContain('Xin lỗi');
    });
  });

  describe('Response Validation', () => {
    test('rejects empty responses', () => {
      const result = validateAIResponse('');
      expect(result.valid).toBe(false);
    });

    test('detects hallucinations', () => {
      const result = validateAIResponse('I don\'t have access to that information');
      expect(result.valid).toBe(false);
    });

    test('sanitizes HTML', () => {
      const result = validateAIResponse('Hello <script>alert("xss")</script> world');
      expect(result.sanitized).not.toContain('<script>');
    });
  });
});

// ⚠️ REQUIRED:
// ✅ 100% coverage for protected functions
// ✅ Test all edge cases
// ✅ Test error scenarios
// ✅ Test with real data samples
```

---

## 8. Monitoring & Logging

```typescript
/**
 * 🔒 PROTECTED: Bot Analytics
 *
 * Track bot performance and issues.
 */

interface BotMetrics {
  timestamp: Date;
  sessionId: string;
  query: string;
  responseTime: number;
  tokensUsed: number;
  success: boolean;
  error?: string;
}

async function logBotInteraction(metrics: BotMetrics) {
  // Log to database for analysis
  await prisma.botLog.create({ data: metrics });

  // Alert on errors
  if (!metrics.success) {
    await sendAlert({
      type: 'bot_error',
      message: `Bot error: ${metrics.error}`,
      sessionId: metrics.sessionId,
    });
  }

  // Alert on high cost
  if (metrics.tokensUsed > 5000) {
    await sendAlert({
      type: 'high_token_usage',
      message: `High token usage: ${metrics.tokensUsed}`,
      query: metrics.query,
    });
  }
}

// ⚠️ DO NOT:
// ❌ Skip logging (can't debug production issues)
// ❌ Log user data to external services (privacy)
// ❌ Ignore high token usage (cost control)
```

---

## 9. Version Control for Prompts

```typescript
/**
 * 🔒 PROTECTED: Prompt Versioning
 *
 * Track prompt changes and A/B test.
 */

const PROMPTS = {
  v1: {
    date: '2024-01-01',
    prompt: 'Old prompt...',
    metrics: {
      avgResponseTime: 2000,
      userSatisfaction: 0.75,
      accuracyRate: 0.80,
    },
  },

  v2: {
    date: '2024-03-01',
    prompt: 'Improved prompt...',
    metrics: {
      avgResponseTime: 1500,
      userSatisfaction: 0.85,
      accuracyRate: 0.90,
    },
  },

  // 🔒 CURRENT VERSION
  current: 'v2',
};

function getPrompt(): string {
  return PROMPTS[PROMPTS.current].prompt;
}

// ⚠️ RULES:
// 1. Never delete old versions (needed for rollback)
// 2. Always document why version changed
// 3. Keep metrics for comparison
// 4. Test new versions in staging first
```

---

## 10. A/B Testing Framework

```typescript
/**
 * ✅ SAFE: A/B Test New Prompts
 *
 * Test changes before full rollout.
 */

function shouldUseExperiment(sessionId: string): boolean {
  // 10% of users get new prompt
  const hash = hashString(sessionId);
  return hash % 10 === 0;
}

async function getBotResponse(sessionId: string, query: string) {
  const useExperiment = shouldUseExperiment(sessionId);

  const prompt = useExperiment
    ? PROMPTS.experimental
    : PROMPTS.current;

  const response = await callAI(prompt, query);

  // Log for analysis
  await logBotInteraction({
    sessionId,
    variant: useExperiment ? 'experimental' : 'control',
    response,
    // ...
  });

  return response;
}
```

---

## Summary: Bot Development Checklist

### Before Making Changes:
- [ ] Read all 🔒 PROTECTED markers
- [ ] Understand why existing logic exists
- [ ] Check if change affects token usage
- [ ] Consider impact on cost

### When Changing Prompts:
- [ ] Save old version
- [ ] A/B test in staging
- [ ] Monitor metrics for 1 week
- [ ] Document improvements

### When Modifying RAG:
- [ ] Test with no results scenario
- [ ] Test with 1 result
- [ ] Test with many results
- [ ] Verify fallback works

### Before Deploying:
- [ ] All tests pass
- [ ] Token usage validated
- [ ] Fallbacks tested
- [ ] Rollback plan ready

---

## Common Mistakes to Avoid

### ❌ DON'T:
```typescript
// DON'T simplify without testing
async function buildContext(query: string) {
  return await search(query);  // ❌ Missing fallback!
}

// DON'T skip validation
async function chat(query: string) {
  return await openai.complete(query);  // ❌ No validation!
}

// DON'T ignore costs
const response = await openai.complete(hugePrompt);  // ❌ No token limit!
```

### ✅ DO:
```typescript
// DO include fallbacks
async function buildContext(query: string) {
  const results = await search(query);
  return results.length > 0 ? format(results) : getDefault();
}

// DO validate responses
async function chat(query: string) {
  const raw = await openai.complete(query);
  return validateAIResponse(raw);
}

// DO control costs
const truncated = truncateToTokenLimit(prompt);
const response = await openai.complete(truncated);
```
