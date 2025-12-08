/**
 * ⚠️ AI CODING ASSISTANT INSTRUCTIONS ⚠️
 *
 * This file contains critical bot logic.
 *
 * RULES:
 * 1. DO NOT refactor without explicit user permission
 * 2. DO NOT remove any existing logic
 * 3. DO NOT change prompt templates
 * 4. ASK before making structural changes
 *
 * If user asks to "improve" or "refactor":
 * - Show proposed changes first
 * - Explain what will be removed/changed
 * - Wait for confirmation
 */

import OpenAI from 'openai';
import { prisma } from '@/lib/prisma';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ============================================
// 🔒 PROTECTED: System Prompt
// Purpose: Core bot personality and behavior
// Author: [Your Name]
// Date: [Date]
// DO NOT MODIFY without A/B testing
// ============================================

const SYSTEM_PROMPT = `
Bạn là chatbot hỗ trợ về SOP (Standard Operating Procedure).

# Vai trò
Bạn giúp nhân viên tìm hiểu và thực hiện các quy trình SOP một cách chính xác.

# Nguyên tắc
1. Trả lời dựa trên thông tin SOP có sẵn
2. Nếu không biết, thừa nhận và hướng dẫn cách tìm
3. Luôn chính xác, không đoán mò
4. Trả lời bằng tiếng Việt

# Cách trả lời
- Ngắn gọn, súc tích (2-3 câu)
- Dẫn nguồn từ SOP nào
- Đưa link đến SOP đầy đủ nếu cần

# Không được
- Đưa thông tin sai
- Tư vấn ngoài phạm vi SOP
- Trả lời về topics nhạy cảm
`;

// ============================================
// END PROTECTED SECTION
// ============================================

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  success: boolean;
  message?: string;
  error?: string;
  tokensUsed?: number;
}

export class SOPChatBot {
  // ============================================
  // 🔒 PROTECTED: RAG Context Building
  // Purpose: Builds context from relevant SOPs
  // DO NOT MODIFY: Logic tuned for accuracy
  // ============================================

  private async buildContext(query: string): Promise<string> {
    // Search relevant SOPs
    const relevantSOPs = await prisma.sOP.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 5,
      orderBy: { updatedAt: 'desc' },
    });

    // 🔒 CRITICAL: Fallback for no results
    // DO NOT return empty string (causes hallucination)
    if (relevantSOPs.length === 0) {
      return this.getDefaultContext();
    }

    // Format context
    return relevantSOPs
      .map(
        (sop, i) => `
=== Document ${i + 1}: ${sop.title} ===
${sop.content}

Metadata: Created ${sop.createdAt.toLocaleDateString()}, Updated ${sop.updatedAt.toLocaleDateString()}
      `
      )
      .join('\n\n');
  }

  // ============================================
  // 🔒 PROTECTED: Default Context
  // Purpose: Fallback when no SOPs found
  // This prevents hallucination
  // ============================================

  private getDefaultContext(): string {
    return `
Không tìm thấy SOP cụ thể cho câu hỏi này.

Tôi có thể giúp bạn với:
- Tìm kiếm SOP theo tiêu đề
- Giải thích các quy trình chung
- Hướng dẫn cách sử dụng hệ thống SOP

Bạn có thể hỏi cụ thể hơn hoặc xem danh sách tất cả SOP tại /sop/list
    `;
  }

  // ============================================
  // 🔒 PROTECTED: AI Call with Retry
  // Purpose: Handles OpenAI API with retry logic
  // Each retry strategy handles different error types
  // DO NOT SIMPLIFY
  // ============================================

  private async callOpenAI(
    messages: ChatMessage[],
    retries: number = 3
  ): Promise<string> {
    let lastError: any;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          temperature: 0.3, // 🔒 Low for consistency
          max_tokens: 500, // 🔒 Cost control
        });

        return response.choices[0].message.content || '';
      } catch (error: any) {
        lastError = error;

        // Different retry logic for different errors
        if (error.code === 'rate_limit_exceeded') {
          await this.sleep(attempt * 5000);
        } else if (error.code === 'timeout') {
          await this.sleep(1000);
        } else {
          break; // Don't retry other errors
        }
      }
    }

    // 🔒 FALLBACK: Never fail silently
    console.error('OpenAI call failed:', lastError);
    return 'Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau ít phút.';
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // ============================================
  // 🔒 PROTECTED: Response Validation
  // Purpose: Ensures AI output is safe and useful
  // DO NOT SKIP: Security & UX critical
  // ============================================

  private validateResponse(response: string): {
    valid: boolean;
    sanitized: string;
    reason?: string;
  } {
    // Check 1: Not empty
    if (!response || response.trim().length === 0) {
      return {
        valid: false,
        sanitized:
          'Xin lỗi, tôi không thể tạo câu trả lời. Vui lòng thử lại.',
        reason: 'Empty response',
      };
    }

    // Check 2: No hallucination markers
    const hallucinations = [
      "I don't have access",
      'I cannot see',
      'As an AI',
      "I apologize, but I don't",
    ];

    for (const marker of hallucinations) {
      if (response.includes(marker)) {
        return {
          valid: false,
          sanitized:
            'Xin lỗi, tôi không tìm thấy thông tin phù hợp. Bạn có thể hỏi cụ thể hơn không?',
          reason: 'Hallucination detected',
        };
      }
    }

    // Check 3: Length reasonable
    if (response.length < 10) {
      return {
        valid: false,
        sanitized:
          'Bạn có thể hỏi cụ thể hơn để tôi có thể hỗ trợ tốt hơn?',
        reason: 'Response too short',
      };
    }

    // Sanitize: Remove unsafe content
    const sanitized = response
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
      .trim();

    return {
      valid: true,
      sanitized,
    };
  }

  // ============================================
  // ✅ PUBLIC API: Chat Function
  // This is safe to modify for features
  // But don't break the interface
  // ============================================

  async chat(
    query: string,
    history: ChatMessage[] = []
  ): Promise<ChatResponse> {
    try {
      // Build context from SOPs
      const context = await this.buildContext(query);

      // Prepare messages
      const messages: ChatMessage[] = [
        { role: 'user', content: SYSTEM_PROMPT },
        { role: 'user', content: `Context:\n${context}` },
        ...history,
        { role: 'user', content: query },
      ];

      // Call OpenAI
      const rawResponse = await this.callOpenAI(messages);

      // Validate response
      const validation = this.validateResponse(rawResponse);

      if (!validation.valid) {
        console.warn('Invalid bot response:', validation.reason);
      }

      return {
        success: true,
        message: validation.sanitized,
      };
    } catch (error: any) {
      console.error('Bot error:', error);
      return {
        success: false,
        error: 'Đã xảy ra lỗi. Vui lòng thử lại.',
      };
    }
  }
}

// ============================================
// ✅ USAGE EXAMPLE (Safe to modify)
// ============================================

/*
const bot = new SOPChatBot();

// Simple chat
const response = await bot.chat('Quy trình onboarding nhân viên mới?');

// With history
const history = [
  { role: 'user', content: 'Onboarding mất bao lâu?' },
  { role: 'assistant', content: 'Thường mất 2-3 ngày...' },
];

const response2 = await bot.chat('Cần chuẩn bị gì?', history);
*/
