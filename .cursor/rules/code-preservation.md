# Code Preservation Rules - Bảo Vệ Logic Quan Trọng

## 🚨 CRITICAL: Đọc kỹ trước khi sửa code

## Mục đích
Ngăn chặn AI/developer vô tình thay đổi hoặc xóa logic quan trọng trong dự án.

---

## 1. Protected Code Markers

### Cú pháp đánh dấu code quan trọng

#### TypeScript/JavaScript:
```typescript
// ============================================
// 🔒 PROTECTED: DO NOT MODIFY
// Purpose: [Mô tả tại sao code này quan trọng]
// Author: [Tên người viết]
// Date: [Ngày tạo]
// Dependencies: [Các module phụ thuộc]
// ============================================

async function criticalBusinessLogic() {
  // Your important code here
}

// ============================================
// END PROTECTED SECTION
// ============================================
```

#### Python:
```python
# ============================================
# 🔒 PROTECTED: DO NOT MODIFY
# Purpose: [Mô tả]
# Author: [Tên]
# Date: [Ngày]
# ============================================

def critical_automation_script():
    # Your important code here
    pass

# ============================================
# END PROTECTED SECTION
# ============================================
```

---

## 2. AI Coding Instructions

### Trong comment đầu file quan trọng:

```typescript
/**
 * ⚠️ AI CODING ASSISTANT INSTRUCTIONS ⚠️
 *
 * This file contains critical business logic for [Feature Name].
 *
 * RULES:
 * 1. DO NOT refactor without explicit user permission
 * 2. DO NOT remove any existing logic
 * 3. DO NOT change function signatures
 * 4. DO NOT optimize prematurely
 * 5. ASK before making structural changes
 *
 * If user asks to "improve" or "refactor":
 * - Show proposed changes first
 * - Explain what will be removed/changed
 * - Wait for confirmation
 *
 * DEPENDENCIES:
 * - [List critical dependencies]
 *
 * BREAKING THIS FILE MAY CAUSE:
 * - [List potential impacts]
 */

// Your code here
```

---

## 3. Bot Logic Protection

### Đặc biệt quan trọng cho chatbot/AI features:

```typescript
/**
 * 🤖 BOT LOGIC - CRITICAL SECTION
 *
 * This contains the core bot response logic.
 *
 * ⚠️ DO NOT:
 * - Change prompt templates without testing
 * - Remove fallback logic
 * - Modify error handling
 * - Change RAG context building
 *
 * ✅ SAFE TO:
 * - Add new response types (append only)
 * - Improve error messages
 * - Add logging
 */

export class SOPChatBot {
  // 🔒 PROTECTED: Core prompt template
  private readonly SYSTEM_PROMPT = `
    Bạn là chatbot hỗ trợ SOP.
    [... rest of prompt - DO NOT MODIFY]
  `;

  // 🔒 PROTECTED: RAG context building
  private async buildContext(query: string): Promise<string> {
    // Critical logic for context retrieval
    // DO NOT refactor without testing
    const relevantSOPs = await this.searchSOPs(query);

    // Special handling for edge cases
    if (relevantSOPs.length === 0) {
      return this.getDefaultContext();
    }

    return relevantSOPs
      .map(sop => `${sop.title}\n${sop.content}`)
      .join('\n\n---\n\n');
  }

  // ✅ SAFE TO MODIFY: Response formatting (non-critical)
  private formatResponse(text: string): string {
    // Format response here
    return text;
  }
}
```

---

## 4. Configuration Files Protection

### Đánh dấu config quan trọng:

```typescript
// config/bot.config.ts

/**
 * 🔒 PROTECTED CONFIGURATION
 *
 * These values are tuned for production performance.
 * DO NOT change without:
 * 1. Testing in staging environment
 * 2. Getting approval from team lead
 * 3. Documenting the change
 */

export const BOT_CONFIG = {
  // 🔒 CRITICAL: Tuned for accuracy vs speed tradeoff
  maxContextTokens: 3000,

  // 🔒 CRITICAL: Prevents hallucination
  temperature: 0.3,

  // 🔒 CRITICAL: Cost control
  maxTokensPerResponse: 500,

  // ✅ SAFE TO TUNE: UI preferences
  responseDelay: 1000,
  showTypingIndicator: true,
};
```

---

## 5. Database Schema Protection

```prisma
// prisma/schema.prisma

/**
 * ⚠️ SCHEMA CHANGE RULES:
 *
 * 1. NEVER delete fields without migration plan
 * 2. NEVER change field types without data migration
 * 3. ALWAYS add new fields as optional first
 * 4. TEST migrations on backup data
 *
 * Breaking schema = Breaking production!
 */

model SOP {
  id        String   @id @default(cuid())

  // 🔒 PROTECTED: Core fields used by bot
  title     String
  content   String   @db.Text
  embedding Float[]  // 🔒 DO NOT REMOVE: Used for RAG search

  // ✅ SAFE TO ADD: New optional fields
  summary   String?  @db.Text

  @@index([title])
  @@map("sops")
}
```

---

## 6. Automation Script Protection

```python
# services/python-worker/scripts/critical_automation.py

"""
🔒 PROTECTED AUTOMATION SCRIPT

This script handles critical daily updates.

⚠️ MODIFICATIONS REQUIRE:
1. Testing in development
2. Dry-run in staging
3. Rollback plan ready
4. Team notification

RUNS: Daily at 3AM
IMPACTS: Production database, revenue data
DEPENDENCIES: PostgreSQL, external API
"""

# 🔒 PROTECTED: Critical constants
MAX_RETRIES = 3
BATCH_SIZE = 1000
TIMEOUT_SECONDS = 300

def download_and_upload():
    """
    🔒 PROTECTED FUNCTION

    DO NOT modify logic without understanding:
    - Idempotency requirements
    - Transaction boundaries
    - Error recovery process
    """
    # Your critical code here
    pass
```

---

## 7. API Endpoint Protection

```typescript
// app/api/sop/chat/route.ts

/**
 * 🔒 PROTECTED API ENDPOINT
 *
 * This endpoint is used by:
 * - Production chatbot
 * - Mobile app
 * - External integrations
 *
 * ⚠️ DO NOT:
 * - Change response format (breaks clients)
 * - Remove error codes (breaks error handling)
 * - Change authentication logic
 * - Modify rate limiting without testing
 */

export async function POST(request: NextRequest) {
  // 🔒 PROTECTED: Request validation
  const body = await request.json();

  // DO NOT simplify this validation
  // Each check catches specific production errors
  if (!body.query) {
    return NextResponse.json(
      { success: false, error: 'query_required', code: 'E001' },
      { status: 400 }
    );
  }

  // ... rest of logic
}
```

---

## 8. Git Commit Message Rules

### Để track changes quan trọng:

```bash
# Format cho commits thay đổi protected code
git commit -m "⚠️ CRITICAL: [module] - [what changed]

PROTECTED CODE MODIFIED: [file path]
REASON: [why change was necessary]
TESTED: [how it was tested]
REVIEWED BY: [team member]

[Detailed explanation]
"

# Example:
git commit -m "⚠️ CRITICAL: bot - Updated RAG context logic

PROTECTED CODE MODIFIED: lib/ai/chatbot.ts
REASON: Fix edge case when no SOPs found
TESTED: 50 test cases, staging environment
REVIEWED BY: @teammate

Previous logic returned empty string causing bot to hallucinate.
New logic provides default helpful context.
"
```

---

## 9. Code Review Checklist

### Trước khi merge PR thay đổi protected code:

```markdown
## Protected Code Review Checklist

- [ ] Tất cả 🔒 PROTECTED sections được giữ nguyên hoặc có lý do rõ ràng
- [ ] Bot logic được test với 10+ test cases thực tế
- [ ] Config changes được test trong staging
- [ ] Database migrations có rollback plan
- [ ] API changes backward compatible
- [ ] Documentation được update
- [ ] Team lead đã review và approve
- [ ] Rollback plan sẵn sàng

## Changes to Protected Code

**File**: [path]
**Section**: [which protected section]
**Reason**: [why necessary]
**Testing**: [how tested]
**Risk Level**: Low/Medium/High
```

---

## 10. Documentation Rules

### Luôn document protected logic:

```typescript
/**
 * analyzeSOP - Core SOP analysis function
 *
 * 🔒 PROTECTED FUNCTION
 *
 * PURPOSE:
 * This function analyzes SOP content and triggers alerts for urgent items.
 * It's critical for compliance and safety.
 *
 * BUSINESS LOGIC:
 * 1. Check for urgent keywords (urgent, critical, deadline)
 * 2. If found, send immediate alert to team
 * 3. Then process with AI for summarization
 *
 * ⚠️ DO NOT remove the alert logic even if it seems "unnecessary"
 * This prevented 3 critical incidents in production.
 *
 * DEPENDENCIES:
 * - OpenAI API for summarization
 * - Email service for alerts
 * - Database for logging
 *
 * HISTORY:
 * - 2024-01-15: Added urgent keyword detection (prevented incident)
 * - 2024-02-20: Added retry logic for OpenAI failures
 * - 2024-03-10: Added email alerts
 *
 * @param content - SOP text content
 * @returns Promise<AnalysisResult>
 */
async function analyzeSOP(content: string): Promise<AnalysisResult> {
  // Implementation
}
```

---

## 11. Separation of Concerns

### Tách code critical và non-critical:

```
src/
├── core/                    # 🔒 PROTECTED - Core business logic
│   ├── bot-engine.ts       # Bot logic (protected)
│   ├── rag-system.ts       # RAG implementation (protected)
│   └── automation.ts       # Critical automations (protected)
│
├── features/               # ✅ SAFE TO MODIFY - Feature implementations
│   ├── sop-management/
│   ├── dashboard/
│   └── reports/
│
├── ui/                     # ✅ SAFE TO MODIFY - UI components
│   ├── components/
│   └── pages/
│
└── utils/                  # ⚠️ CAREFUL - Shared utilities
    ├── formatters.ts       # Safe to modify
    └── validators.ts       # Protected (used by core)
```

---

## 12. Environment-Based Protection

### Development vs Production safeguards:

```typescript
// lib/safety-checks.ts

/**
 * 🔒 PROTECTED: Production safety checks
 *
 * These checks prevent dangerous operations in production.
 * DO NOT disable or remove.
 */

export function requireNonProduction(operation: string) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      `❌ Operation "${operation}" not allowed in production. ` +
      `This is a safety mechanism. If you really need this, ` +
      `add explicit production override with proper authorization.`
    );
  }
}

// Usage in dangerous operations:
export async function deleteAllData() {
  requireNonProduction('deleteAllData');
  // ... deletion logic
}
```

---

## 13. Version Pinning for Critical Dependencies

```json
// package.json

{
  "dependencies": {
    // 🔒 PINNED: Bot dependencies (exact versions)
    "openai": "4.20.1",           // DO NOT auto-update
    "langchain": "0.1.0",         // Breaking changes in minor versions

    // ✅ FLEXIBLE: UI dependencies (can update)
    "react": "^18.0.0",
    "tailwindcss": "^3.0.0"
  },

  "comments": {
    "openai": "Pinned due to API changes breaking bot logic",
    "langchain": "Pinned due to RAG system dependency"
  }
}
```

---

## 14. Testing Requirements for Protected Code

```typescript
// __tests__/protected/bot-logic.test.ts

/**
 * 🔒 PROTECTED TESTS
 *
 * These tests MUST pass before deploying changes to bot logic.
 *
 * Coverage requirement: 100% for protected functions
 */

describe('🔒 Protected: Bot Core Logic', () => {
  // Test all edge cases
  test('handles empty query', async () => {
    // ...
  });

  test('handles malformed input', async () => {
    // ...
  });

  test('urgent keywords trigger alert', async () => {
    // THIS TEST MUST ALWAYS PASS
    const result = await analyzeSOP('URGENT: Critical issue');
    expect(result.alertSent).toBe(true);
  });

  // 50+ more tests...
});
```

---

## 15. AI Assistant Configuration

### Thêm vào `.cursorrules` hoặc `.claude.md`:

```markdown
# AI Assistant Rules for This Project

## General Rules
1. ALWAYS read protected code markers (🔒) before suggesting changes
2. NEVER remove or refactor protected sections without user approval
3. ASK before making structural changes to core logic
4. PRESERVE all business logic, even if it seems redundant

## Bot/AI Feature Rules
1. DO NOT change bot prompts without testing
2. DO NOT simplify RAG logic
3. DO NOT remove fallback handling
4. DO NOT change error messages without approval

## When User Says "Improve" or "Refactor"
1. First, show what you plan to change
2. Explain what will be removed/modified
3. Highlight any protected code affected
4. Wait for explicit approval

## Safe Operations (No approval needed)
- Add logging
- Add comments
- Fix typos
- Add new features (append only)
- Improve error messages (without changing codes)

## Dangerous Operations (Always ask first)
- Refactor core logic
- Remove existing code
- Change function signatures
- Modify database schema
- Update bot prompts
- Change API responses
```

---

## Summary: Protection Levels

### 🔒 Level 1: CRITICAL - Never touch without approval
- Bot core logic
- RAG system
- Automation scripts
- Database schema
- API contracts
- Authentication

### ⚠️ Level 2: IMPORTANT - Be careful
- Business logic
- Configuration
- Shared utilities
- Error handling

### ✅ Level 3: SAFE - Can modify freely
- UI components
- Formatting
- Logging
- Comments
- Documentation

---

## Quick Reference

### Add protection to code:
```typescript
// 🔒 PROTECTED: [reason]
// Your code here
// END PROTECTED
```

### AI instruction in file:
```typescript
/**
 * ⚠️ AI: DO NOT refactor this file without user approval
 * Contains critical [feature] logic
 */
```

### Commit protected changes:
```bash
git commit -m "⚠️ CRITICAL: [module] - [change]"
```

### Before deploying:
- [ ] All protected tests pass
- [ ] Staging tested
- [ ] Rollback plan ready
- [ ] Team notified
