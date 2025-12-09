# 🧰 VibeKit - Universal Development Kit Resources

This folder contains all **VibeCodeKit utilities, tools, and resources** that power the development experience. Everything here is designed to help you build faster with AI-powered automation.

## 📁 Folder Structure

```
vibekit/
├── 📜 scripts/           # CLI tools & automation scripts
├── 📚 docs/              # Complete documentation
├── 🧠 memory-bank/       # AI context & project memory
├── 🎨 templates/         # Code generation templates
├── 🐍 python-worker/     # Python automation workers
├── 🎯 ui-ux-pro-max-skill-main/  # UI/UX design system
└── ⚙️  setup/            # Setup guides (Vietnamese)
```

---

## 📜 **scripts/**

CLI tools and automation scripts for project initialization and maintenance.

### Key Scripts:

**JavaScript:**
- `init.js` - Smart project initializer (Lite/Pro modes)
- `doctor.js` - Health check & diagnostics
- `init-from-config.js` - Initialize from saved config
- `rename-project.js` - Rename project utility
- `setup-new-project.js` - New project setup wizard
- `verify-memory.js` - Verify memory bank integrity

**Windows Batch Files:**
- `INIT_PROJECT.bat` - Windows GUI for project initialization
- `RUN_WEB.bat` - One-click web server startup

### Usage:

```bash
# Initialize project (interactive)
npm run init

# Run health check
npm run doctor

# Windows users (double-click)
vibekit/scripts/INIT_PROJECT.bat
vibekit/scripts/RUN_WEB.bat
```

---

## 📚 **docs/**

Complete documentation for VibeCodeKit features and workflows.

### Documents:

- `quick-start.md` - Get started in 5 minutes
- `serverless-deployment.md` - Deploy for $0/month (Vercel + Supabase)
- `lite-to-pro-upgrade.md` - Upgrade from Lite to Pro mode
- `python-worker-automation.md` - Python automation guide
- `memory-bank-workflow.md` - How to use memory bank
- `code-protection-guide.md` - Protect code from AI changes
- `doctor-and-rules.md` - Using doctor.js & cursor rules
- `cli-tools.md` - CLI tools reference
- `why-vibecodekit.md` - Kit philosophy & benefits
- `AGENTS.md` - AI agents documentation
- `setup-new-project.md` - New project setup guide

### Quick Links:

```bash
# Local docs (after running dev server)
http://localhost:3000/docs

# Memory bank docs
http://localhost:3000/docs/memory-bank/architecture
```

---

## 🧠 **memory-bank/**

AI context storage for better project understanding. This is where AI "remembers" your project decisions.

### Files:

- `project-brief.md` - High-level project overview
- `architecture.md` - System architecture diagrams
- `tech-stack.md` - Technologies & frameworks used
- `api-specs.md` - API documentation
- `decisions.md` - Architectural decisions (ADR)
- `implementation-plan.md` - Development roadmap
- `progress.md` - Current progress & next steps

### How It Works:

1. **AI reads these files** before answering questions
2. **You update them** as project evolves
3. **Better context** = Better AI suggestions

Example:
```bash
# Tell AI what you're building
vibekit/memory-bank/project-brief.md
→ "We're building a SaaS platform for task management..."

# AI now knows your context!
```

---

## 🎨 **templates/**

Code generation templates for common patterns.

### Categories:

**API Templates:**
- `rest-endpoint/` - REST API route template

**React Templates:**
- `component/` - React component with tests
- `hook/` - Custom React hook
- `page/` - Next.js page template

**Full-Stack Templates:**
- `crud-feature/` - Complete CRUD feature

**Protected Code:**
- `bot-template.ts` - AI bot template (protected from changes)

### Usage:

Templates are used by AI when you ask to create new features:

```
User: "Create a new user management page"
AI: Uses templates/react/page/page.tsx as base
```

---

## 🐍 **python-worker/**

Python microservices for automation tasks.

### Files:

- `main.py` - Main worker entry point
- `api_stub.py` - API integration examples
- `requirements.txt` - Python dependencies

### Use Cases:

- Data processing
- Scheduled jobs
- Integration with external APIs
- Heavy computation tasks

### Setup:

```bash
cd vibekit/python-worker
pip install -r requirements.txt
python main.py
```

---

## 🎯 **ui-ux-pro-max-skill-main/**

UI/UX design system with 57 styles, 95 palettes, 56 font pairings.

### What's Inside:

- **57 UI Styles** (Glassmorphism, Bento, Brutalism, etc.)
- **95 Color Palettes** (SaaS Fintech, Crypto, E-commerce, etc.)
- **56 Font Pairings** (Geist + JetBrains Mono, Inter + Space Mono, etc.)
- **24 Chart Types** (Line, Bar, Pie, Heatmap, etc.)
- **98 UX Guidelines** (Accessibility, Mobile-first, etc.)

### Usage:

```bash
# AI automatically uses this when you ask for UI
User: "Create a modern dashboard with glassmorphism"
AI: Uses ui-ux-pro-max-skill-main/data/styles.csv
```

### Supported Frameworks:

- React, Next.js, Vue, Svelte
- React Native, Flutter
- HTML + Tailwind, SwiftUI

---

## ⚙️ **setup/**

Setup guides in Vietnamese for beginners.

### Guides:

- `HUONG_DAN_CHAY_WEB.txt` - Web server setup guide
- `README_VIETNAMESE.md` - Vietnamese README

---

## 🚀 Quick Commands

```bash
# Initialize new project
npm run init

# Run development server
npm run dev:lite        # Serverless mode ($0/month)
npm run dev:pro         # Docker mode (full stack)

# Deploy to production
npm run deploy:vercel   # Deploy to Vercel
npm run deploy:docker   # Deploy with Docker

# Health check
npm run doctor

# Windows users
vibekit/scripts/INIT_PROJECT.bat  # Initialize
vibekit/scripts/RUN_WEB.bat       # Run web server
```

---

## 📖 Learn More

- **Main README:** [../README.md](../README.md)
- **Documentation:** [http://localhost:3000/docs](http://localhost:3000/docs)
- **API Docs:** [http://localhost:3000/docs](http://localhost:3000/docs)
- **Kit Guide:** [http://localhost:3000/kit-guide](http://localhost:3000/kit-guide)

---

## 💡 Philosophy

Everything in this folder follows the **80/20 principle**:

- ✅ **20% of features** → Covers **80% of use cases**
- ✅ **Modular & optional** → Take what you need, ignore the rest
- ✅ **AI-first** → Designed for AI-powered development
- ✅ **Cost-effective** → Start at $0/month, scale to millions

**Remember:** VibeKit is a **toolkit**, not a framework. You're in control! 🎯

---

## 🆘 Need Help?

- Check [docs/quick-start.md](docs/quick-start.md) first
- Run `npm run doctor` for diagnostics
- Open an issue on GitHub
- Join our Discord community

**Built with ❤️ by the VibeCodeKit team**
