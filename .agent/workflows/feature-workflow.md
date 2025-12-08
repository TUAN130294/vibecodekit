# Feature Development Workflow

## Overview
Complete workflow for developing a new feature from requirements to deployment.

## Workflow Steps

### 1. Analyze Requirements
**Input**: Feature description, user stories, acceptance criteria

**Actions**:
- Parse requirements
- Identify affected components
- List dependencies
- Estimate complexity
- Identify edge cases

**Output**: Requirements analysis document

**Example**:
```markdown
## Feature: User Profile Settings

### Requirements
- Users can update their profile information
- Profile photo upload
- Email notification preferences
- Privacy settings

### Affected Components
- Frontend: ProfileSettings component
- Backend: /api/users/:id endpoint
- Database: users table migration
- Auth: Permission checks

### Dependencies
- Image upload service
- Email service
- Auth middleware

### Complexity: Medium (3-5 days)

### Edge Cases
- Concurrent updates
- Large file uploads
- Invalid email format
- Permission boundaries
```

---

### 2. Create Implementation Plan
**Input**: Requirements analysis

**Actions**:
- Break down into tasks
- Define file structure
- Identify reusable components
- Plan tests
- Define API contracts

**Output**: Implementation plan

**Example**:
```markdown
## Implementation Plan

### Phase 1: Database & Backend (Day 1)
1. Create migration for user settings
2. Update User entity with new fields
3. Implement PUT /api/users/:id endpoint
4. Add validation middleware
5. Write unit tests for service layer

### Phase 2: Frontend UI (Day 2)
1. Create ProfileSettings component
2. Create form with react-hook-form
3. Implement image upload
4. Add loading/error states
5. Write component tests

### Phase 3: Integration (Day 3)
1. Connect frontend to API
2. Add optimistic updates
3. Implement error handling
4. E2E tests
5. Documentation

### Files to Create/Modify
- [ ] src/entities/User.ts (modify)
- [ ] src/migrations/add-user-settings.ts (create)
- [ ] src/controllers/userController.ts (modify)
- [ ] src/services/userService.ts (modify)
- [ ] app/components/ProfileSettings.tsx (create)
- [ ] app/api/users/[id]/route.ts (modify)

### API Contract
PUT /api/users/:id
Body: {
  name?: string;
  avatar?: string;
  emailNotifications?: boolean;
  privacyLevel?: 'public' | 'private';
}
Response: { success: true, data: User }
```

---

### 3. Generate Code
**Input**: Implementation plan

**Actions**:
- Generate boilerplate code
- Create components from templates
- Implement business logic
- Add type definitions
- Include error handling

**Output**: Initial code implementation

---

### 4. Generate Tests
**Input**: Generated code

**Actions**:
- Generate unit tests
- Generate integration tests
- Generate E2E tests for critical paths
- Ensure >80% coverage

**Output**: Complete test suite

---

### 5. Review Code
**Input**: Code + Tests

**Actions**:
- Run code-reviewer skill
- Check best practices
- Verify security
- Validate performance
- Ensure accessibility

**Output**: Code review report with suggestions

---

### 6. Create Documentation
**Input**: Final code

**Actions**:
- Generate API documentation
- Update component documentation
- Add usage examples
- Update README if needed
- Create changelog entry

**Output**: Documentation files

**Example**:
```markdown
## ProfileSettings Component

### Usage
\`\`\`tsx
import { ProfileSettings } from '@/components/ProfileSettings';

function SettingsPage() {
  return <ProfileSettings userId={currentUser.id} />;
}
\`\`\`

### Props
- `userId`: string - ID of user to edit
- `onSave?`: (user: User) => void - Callback after successful save
- `onCancel?`: () => void - Callback when user cancels

### Features
- Profile photo upload with preview
- Email notification toggle
- Privacy level selection
- Form validation
- Optimistic updates
- Error handling

### Accessibility
- Keyboard navigation supported
- ARIA labels on all form fields
- Focus management
- Screen reader tested
```

---

## Workflow Execution

### Interactive Mode
```bash
# Start feature workflow
/workflow feature "User profile settings page"

# Agent will guide through each step
# Review and approve each phase
```

### Automated Mode
```bash
# Run entire workflow automatically
/workflow feature "User profile settings page" --auto

# Agent completes all steps
# Creates PR with all changes
```

### Custom Workflow
```bash
# Run specific steps only
/workflow feature --steps=analyze,plan

# Skip certain steps
/workflow feature --skip=tests

# With custom configuration
/workflow feature --config=.vibecoder/workflows/custom.json
```

---

## Workflow Configuration

```json
{
  "feature": {
    "steps": [
      {
        "name": "analyze",
        "required": true,
        "timeout": 300
      },
      {
        "name": "plan",
        "required": true,
        "approval": "required"
      },
      {
        "name": "generate",
        "required": true,
        "approval": "optional"
      },
      {
        "name": "test",
        "required": true,
        "minCoverage": 80
      },
      {
        "name": "review",
        "required": true,
        "autoFix": true
      },
      {
        "name": "document",
        "required": false,
        "approval": "optional"
      }
    ],
    "quality": {
      "linting": true,
      "typeCheck": true,
      "testCoverage": 80,
      "securityScan": true
    },
    "git": {
      "branch": "feature/{name}",
      "commit": "feat: {description}",
      "pr": {
        "create": true,
        "template": ".github/pull_request_template.md"
      }
    }
  }
}
```

---

## Quality Gates

Each step has quality gates that must pass:

### Analyze Phase
- ✅ Requirements are clear and complete
- ✅ Dependencies identified
- ✅ Edge cases documented

### Plan Phase
- ✅ All tasks defined
- ✅ API contracts specified
- ✅ File structure planned

### Generate Phase
- ✅ Code compiles without errors
- ✅ Follows style guide
- ✅ No TypeScript errors

### Test Phase
- ✅ All tests pass
- ✅ Coverage >= 80%
- ✅ No flaky tests

### Review Phase
- ✅ No critical issues
- ✅ Security scan passed
- ✅ Performance acceptable

### Document Phase
- ✅ All public APIs documented
- ✅ Examples provided
- ✅ Changelog updated

---

## Integration with Git

```bash
# Workflow automatically:
# 1. Creates feature branch
git checkout -b feature/user-profile-settings

# 2. Makes commits at each phase
git commit -m "feat: add user settings migration"
git commit -m "feat: implement profile settings UI"
git commit -m "test: add profile settings tests"
git commit -m "docs: document profile settings"

# 3. Creates pull request
gh pr create --title "Feature: User Profile Settings" \
  --body "$(cat .vibecoder/pr-description.md)"
```

---

## Example: Complete Feature

```bash
$ /workflow feature "Dark mode toggle"

🔍 Analyzing requirements...
✅ Requirements analysis complete

📋 Creating implementation plan...
- Add darkMode state to theme context
- Create DarkModeToggle component
- Update CSS variables
- Persist preference to localStorage
✅ Plan created (4 tasks identified)

💻 Generating code...
✅ Created app/components/DarkModeToggle.tsx
✅ Updated app/contexts/ThemeContext.tsx
✅ Updated global.css with dark mode variables

🧪 Generating tests...
✅ Created DarkModeToggle.test.tsx (8 tests)
✅ Created ThemeContext.test.tsx (5 tests)
✅ Coverage: 94%

🔍 Reviewing code...
✅ No critical issues
⚠️  1 suggestion: Extract CSS variables to constants

📚 Creating documentation...
✅ Updated component documentation
✅ Added usage examples

✅ Feature complete!
📝 Summary:
   - Files created: 2
   - Files modified: 2
   - Tests: 13 passing
   - Coverage: 94%

Ready to create PR? (y/n)
```

---

## Monitoring & Analytics

Track workflow performance:
- Average time per phase
- Success rate
- Common bottlenecks
- Quality metrics trends

```bash
# View workflow analytics
/workflow stats

# Export metrics
/workflow export --format json
```
