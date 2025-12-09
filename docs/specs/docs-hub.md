# VibeCodeKit Docs Hub

## 1. Business Logic
- User wants: Một Docs Hub “hướng dẫn hành động” giống VividKit, đọc markdown trực tiếp, có sidebar, TOC, và thông điệp bán hàng rõ ràng (Memory Bank, Python Worker, Doctor/Rules, Why VibeCodeKit).
- Constraints: Dùng App Router, render từ thư mục `docs/` (FS read, không hardcode), dark mode mặc định, TOC luôn bật nhưng ẩn nếu không có H2/H3, responsive.

## 2. Technical Design
### Content Model & Loading
- Source: các file `.md` trong `docs/`.
- Loader: `lib/docs.ts` dùng `fs`, `path`, `gray-matter` (frontmatter optional) để đọc và trả `{ slug, title, description, content }`.
- Rendering: `react-markdown` + `remark-gfm` + `rehype-highlight` (code highlight). Optional: custom components cho callout/note.

### Routing & Pages
- Dynamic route: `app/docs/[[...slug]]/page.tsx` map URL → file trong `docs/` (slug = path). `notFound()` khi thiếu file.
- Default route `/docs` trỏ tới intro (vd. `quick-start`).
- Metadata: derive từ frontmatter hoặc fallback title map.

### Layout & Navigation
- New layout: `app/docs/layout.tsx`
  - Sidebar trái: menu cứng từ `app/docs/config.ts` (groups: Getting Started; The Vibe Architecture; Workflows; Reference; Why VibeCodeKit).
  - Main content: `prose prose-invert` (tailwind typography).
  - TOC phải: sticky, always-on; auto-extract H2/H3 từ AST; ẩn nếu không có heading.
  - Responsive: trên mobile, sidebar/TOC thành slide-over/hamburger.

### Sidebar Structure (config)
- Getting Started: `quick-start.md`, `setup-new-project.md`
- The Vibe Architecture:
  - Memory Bank Workflow (map tới `memory-bank/implementation-plan.md` or new doc if needed)
  - Next.js + Python Worker Bridge (tóm tắt mô hình Hybrid; map tới `docs/lite-to-pro-upgrade.md` or new stub)
- Workflows:
  - Feature Development (dựa `memory-bank/implementation-plan.md`)
  - Code Protection (`docs/code-protection-guide.md`)
  - Doctor & Rules (doctor.js + `.cursor/rules`)
- Reference:
  - Agents (`docs/AGENTS.md`)
  - CLI/Tools (scripts/ overview)
- Why VibeCodeKit:
  - So sánh “prompts kit” vs “Hệ điều hành” (Memory Bank + Python Worker + Rules). Có thể tạo file mới `docs/why-vibecodekit.md`.

### UI/UX
- Tailwind + `@tailwindcss/typography`; dark mode default.
- Code block highlight via `rehype-highlight`.
- Callout components for Info/Warning.

### Data Flow (Pseudo)
1. Request `/docs/[slug]`
2. Resolve slug → filepath (`docs/${slug}.md`)
3. Read file via `lib/docs.ts` → { meta, content }
4. Render `react-markdown` with plugins
5. Extract headings → TOC
6. Layout renders sidebar + content + toc

## 3. Implementation Checklist
- [ ] Add utilities `lib/docs.ts` (FS read, gray-matter, slug resolver, heading extraction helper).
- [ ] Add deps: `gray-matter`, `react-markdown`, `remark-gfm`, `rehype-highlight` (and types if needed).
- [ ] Create `app/docs/config.ts` (menu structure, slugs, labels).
- [ ] Add layout `app/docs/layout.tsx` (sidebar, responsive shell).
- [ ] Add TOC component (H2/H3 extraction; sticky; hide if empty).
- [ ] Add markdown renderer component with syntax highlighting + callouts.
- [ ] Implement dynamic route `app/docs/[[...slug]]/page.tsx` (load doc, 404 fallback).
- [ ] Add new content file `docs/why-vibecodekit.md` (sales comparison).
- [ ] Wire “Memory Bank Workflow”, “Python Worker Automation”, “Doctor & Rules” sections to existing or new docs as needed.
- [ ] Update navigation defaults and links from old `/docs` page.
- [ ] Verify in dark mode + mobile responsive.

