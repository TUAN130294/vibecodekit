# Code Protection Guide - Hướng Dẫn Sử Dụng

## 🎯 Mục Đích

Ngăn chặn AI/developer vô tình thay đổi hoặc xóa logic quan trọng.

---

## 🚀 Quick Start

### 1. Đánh dấu code quan trọng

#### Cho Bot Logic:
```typescript
// ============================================
// 🔒 PROTECTED: DO NOT MODIFY
// Purpose: Core chatbot RAG logic
// Author: Your Name
// Date: 2024-12-08
// ============================================

async function buildRAGContext(query: string) {
  // Your important code here

  // CRITICAL: Fallback for no results
  if (results.length === 0) {
    return getDefaultContext(); // DO NOT REMOVE
  }
}

// ============================================
// END PROTECTED SECTION
// ============================================
```

#### Cho Automation Scripts:
```python
# ============================================
# 🔒 PROTECTED: DO NOT MODIFY
# Purpose: Daily revenue update
# Author: Your Name
# Date: 2024-12-08
# ============================================

def update_revenue_daily():
    # Your important automation here
    pass

# ============================================
# END PROTECTED SECTION
# ============================================
```

---

### 2. Thêm AI Instructions trong file

```typescript
/**
 * ⚠️ AI CODING ASSISTANT INSTRUCTIONS ⚠️
 *
 * This file contains critical bot logic.
 *
 * RULES:
 * 1. DO NOT refactor without user permission
 * 2. DO NOT remove any logic
 * 3. ASK before making changes
 */

// Your code here
```

---

## 📖 Chi Tiết Rules

### Level 1: 🔒 CRITICAL (Không được sửa)
**Áp dụng cho:**
- Bot core logic (RAG, prompts)
- Automation scripts
- Database schema
- API contracts
- Authentication

**Example:**
```typescript
// 🔒 PROTECTED: Bot system prompt
const SYSTEM_PROMPT = `...`;

// 🔒 PROTECTED: RAG context builder
async function buildContext() { }

// 🔒 PROTECTED: Error retry logic
async function callAI() { }
```

---

### Level 2: ⚠️ IMPORTANT (Cẩn thận)
**Áp dụng cho:**
- Business logic
- Configuration
- Shared utilities

**Example:**
```typescript
// ⚠️ IMPORTANT: Config tuned for production
const CONFIG = {
  maxRetries: 3,
  timeout: 5000,
};
```

---

### Level 3: ✅ SAFE (Tự do sửa)
**Áp dụng cho:**
- UI components
- Formatting
- Logging
- Comments

**Example:**
```typescript
// ✅ SAFE: UI formatting
function formatResponse(text: string) {
  return text.trim();
}
```

---

## 🛠️ Cách Sử Dụng

### Khi tạo file mới quan trọng:

1. **Copy template**
```bash
cp templates/protected-code/bot-template.ts src/bot/my-bot.ts
```

2. **Đánh dấu protected sections**
```typescript
// 🔒 PROTECTED: [Your reason]
// Your code
// END PROTECTED
```

3. **Add AI instructions ở đầu file**

---

### Khi làm việc với AI:

#### ❌ KHÔNG NÊN:
```
You: "Improve this code" (quá chung chung)
AI: *deletes important logic*
```

#### ✅ NÊN:
```
You: "Review this code for improvements,
      but DO NOT modify any 🔒 PROTECTED sections"

AI: "I see protected sections. Here are suggestions
     for non-protected parts..."
```

---

### Khi AI đề xuất changes:

```
AI: "I can refactor this function..."

You: "Does your change affect any 🔒 PROTECTED code?"

AI: "Yes, it modifies the RAG logic..."

You: "No, keep the protected logic.
      Only improve the formatting parts."
```

---

## 📋 Checklist

### Trước khi commit protected code:

- [ ] All 🔒 PROTECTED markers intact
- [ ] Tests pass (especially for bot logic)
- [ ] Staged environment tested
- [ ] Team lead reviewed
- [ ] Rollback plan ready
- [ ] Commit message includes "⚠️ CRITICAL"

### Commit message format:
```bash
git commit -m "⚠️ CRITICAL: bot - Updated RAG logic

PROTECTED CODE MODIFIED: lib/bot/rag.ts
REASON: Fix edge case when no results
TESTED: 50 test cases + staging
REVIEWED BY: @teammate
"
```

---

## 🔍 Examples

### Example 1: Protected Bot Logic

```typescript
// lib/bot/sop-chatbot.ts

/**
 * ⚠️ AI: DO NOT refactor without user approval
 * Contains critical bot response logic
 */

export class SOPChatBot {
  // 🔒 PROTECTED: System prompt
  private readonly SYSTEM_PROMPT = `...`;

  // 🔒 PROTECTED: RAG context building
  private async buildContext(query: string) {
    const results = await this.search(query);

    // CRITICAL: Fallback prevents hallucination
    if (results.length === 0) {
      return this.getDefaultContext();
    }

    return this.formatContext(results);
  }

  // ✅ SAFE: Response formatting (non-critical)
  private formatResponse(text: string) {
    return text.trim();
  }
}
```

---

### Example 2: Protected Config

```typescript
// config/bot.config.ts

/**
 * 🔒 PROTECTED CONFIGURATION
 * Tuned for production performance
 */

export const BOT_CONFIG = {
  // 🔒 CRITICAL: Accuracy vs speed tradeoff
  maxContextTokens: 3000,

  // 🔒 CRITICAL: Prevents hallucination
  temperature: 0.3,

  // ✅ SAFE: UI preference
  showTypingIndicator: true,
};
```

---

### Example 3: Protected Automation

```python
# scripts/daily_update.py

"""
🔒 PROTECTED AUTOMATION

DO NOT MODIFY without:
1. Testing in dev
2. Dry-run in staging
3. Team approval
"""

# 🔒 PROTECTED: Constants
MAX_RETRIES = 3
BATCH_SIZE = 1000

def update_database():
    """
    🔒 PROTECTED FUNCTION

    Critical for daily operations.
    """
    # Your logic here
    pass
```

---

## 🚨 Common Mistakes

### Mistake 1: AI removes fallback
```typescript
// ❌ BAD: AI "simplified" and removed fallback
async function buildContext(query: string) {
  return await search(query); // Missing fallback!
}

// ✅ GOOD: Protected with fallback
async function buildContext(query: string) {
  const results = await search(query);

  // 🔒 PROTECTED: Fallback for no results
  if (results.length === 0) {
    return getDefaultContext();
  }

  return results;
}
```

---

### Mistake 2: AI changes prompt
```typescript
// ❌ BAD: AI "improved" prompt without testing
const PROMPT = `Be helpful`; // Lost important instructions!

// ✅ GOOD: Protected prompt
// 🔒 PROTECTED: System prompt (tested & tuned)
const PROMPT = `
You are an SOP assistant.
[... detailed instructions ...]
`;
```

---

### Mistake 3: AI removes error handling
```typescript
// ❌ BAD: AI removed retry logic
async function callAI() {
  return await openai.complete(prompt);
}

// ✅ GOOD: Protected error handling
// 🔒 PROTECTED: Retry logic for API failures
async function callAI() {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      return await openai.complete(prompt);
    } catch (error) {
      if (i === MAX_RETRIES - 1) throw error;
      await sleep(1000 * i);
    }
  }
}
```

---

## 📚 Full Documentation

Xem chi tiết tại:
- [code-preservation.md](.cursor/rules/code-preservation.md) - General rules
- [ai-chatbot-rules.md](.cursor/rules/ai-chatbot-rules.md) - Bot-specific rules

---

## 🎓 Best Practices

### 1. Document WHY code exists
```typescript
// ❌ BAD: No context
if (results.length === 0) {
  return getDefault();
}

// ✅ GOOD: Explain why
// 🔒 PROTECTED: Fallback prevents AI hallucination
// This was added after production incident on 2024-01-15
// DO NOT REMOVE
if (results.length === 0) {
  return getDefault();
}
```

### 2. Separate concerns
```
src/
├── core/           # 🔒 Protected (critical logic)
├── features/       # ⚠️ Important (business logic)
└── ui/             # ✅ Safe (UI components)
```

### 3. Version prompts
```typescript
const PROMPTS = {
  v1: { prompt: '...', metrics: { accuracy: 0.8 } },
  v2: { prompt: '...', metrics: { accuracy: 0.9 } },
  current: 'v2',
};
```

### 4. Test protected code thoroughly
```typescript
describe('🔒 Protected: Bot Logic', () => {
  test('fallback works when no results', () => {
    // Test critical path
  });

  // 50+ more tests
});
```

---

## 💡 Tips

1. **Mark early**: Đánh dấu protected ngay khi tạo code
2. **Be specific**: Giải thích tại sao code quan trọng
3. **Test well**: Protected code cần 100% test coverage
4. **Review carefully**: Team lead phải review protected changes
5. **Document history**: Ghi lại lý do thay đổi

---

## ❓ FAQ

**Q: Khi nào nên dùng 🔒 PROTECTED?**
A: Khi code xử lý: Bot logic, automation, security, money, data integrity

**Q: AI vẫn thay đổi protected code?**
A: Nhắc lại: "DO NOT modify 🔒 PROTECTED sections" trong prompt

**Q: Có thể sửa protected code không?**
A: Có, nhưng phải: Test → Stage → Review → Rollback plan → Deploy

**Q: Protected code quá nhiều?**
A: Tốt hơn là bảo vệ thừa hơn thiếu. Chỉ protect những gì thực sự critical.

---

## 🔗 Related

- [Bot Template](../templates/protected-code/bot-template.ts)
- [AI Chatbot Rules](../.cursor/rules/ai-chatbot-rules.md)
- [Code Preservation Rules](../.cursor/rules/code-preservation.md)
