# Code Reviewer Skill

## Purpose
Automated code review that checks for best practices, potential bugs, security issues, and suggests improvements.

## Activation
- **Manual**: Type `/review` or use Vibecoder command
- **Auto**: On PR creation (if enabled in config)

## Review Checklist

### 1. Code Quality
- [ ] Functions are small and focused (< 50 lines)
- [ ] No code duplication (DRY principle)
- [ ] Meaningful variable and function names
- [ ] Proper error handling
- [ ] No commented-out code
- [ ] No console.log/debug statements in production code

### 2. TypeScript/Type Safety
- [ ] All parameters have type annotations
- [ ] Return types are explicit
- [ ] No use of `any` type (use `unknown` if needed)
- [ ] Proper null/undefined handling
- [ ] Type guards where appropriate

### 3. React Best Practices
- [ ] Use functional components with hooks
- [ ] Proper dependency arrays in useEffect
- [ ] No inline object/array literals in JSX
- [ ] Props are properly typed
- [ ] Components are memoized when needed
- [ ] No prop drilling (use Context or composition)

### 4. Performance
- [ ] No unnecessary re-renders
- [ ] Proper use of useMemo/useCallback
- [ ] Images are optimized
- [ ] Lazy loading for heavy components
- [ ] No N+1 queries in backend

### 5. Security
- [ ] Input validation
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Secrets not hardcoded
- [ ] Proper authentication/authorization checks
- [ ] HTTPS only for production

### 6. Testing
- [ ] Critical paths have tests
- [ ] Edge cases are covered
- [ ] Tests are readable and maintainable
- [ ] No test dependencies on external services
- [ ] Proper mocking

### 7. Accessibility
- [ ] Semantic HTML
- [ ] ARIA labels where needed
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG standards
- [ ] Alt text for images

### 8. Documentation
- [ ] Complex logic has comments
- [ ] JSDoc for public APIs
- [ ] README updated if needed
- [ ] API changes documented

## Output Format

```markdown
## Code Review Summary

### Overall Rating: [Excellent/Good/Needs Improvement/Poor]

### Critical Issues (Must Fix)
1. [File:Line] - [Issue description]
   - Impact: [Description]
   - Fix: [Suggested fix]

### Warnings (Should Fix)
1. [File:Line] - [Issue description]
   - Reason: [Why this matters]
   - Suggestion: [How to improve]

### Suggestions (Nice to Have)
1. [File:Line] - [Improvement suggestion]
   - Benefit: [What this improves]

### Positive Highlights
- [What was done well]

### Security Concerns
- [Any security issues found]

### Performance Concerns
- [Any performance issues found]

### Next Steps
1. [Action item 1]
2. [Action item 2]
```

## Example Review

```markdown
## Code Review Summary

### Overall Rating: Good

### Critical Issues (Must Fix)
1. src/api/users.ts:45 - SQL Injection Vulnerability
   - Impact: Allows attackers to execute arbitrary SQL
   - Fix: Use parameterized queries
   ```ts
   // Bad
   db.query(`SELECT * FROM users WHERE id = ${userId}`)

   // Good
   db.query('SELECT * FROM users WHERE id = $1', [userId])
   ```

### Warnings (Should Fix)
1. src/components/UserList.tsx:23 - Missing dependency in useEffect
   - Reason: Can cause stale closures and bugs
   - Suggestion: Add `fetchUsers` to dependency array or wrap in useCallback

2. src/utils/format.ts:12 - Using `any` type
   - Reason: Defeats TypeScript's type safety
   - Suggestion: Define proper interface or use generic

### Suggestions (Nice to Have)
1. src/components/Button.tsx:8 - Extract variant styles
   - Benefit: Better maintainability and reusability
   - Consider using a variant object or CSS modules

### Positive Highlights
- Excellent test coverage (95%)
- Clean component structure
- Good use of TypeScript generics
- Proper error boundaries implemented

### Security Concerns
- ✅ Input validation present
- ⚠️  Need rate limiting on login endpoint
- ✅ Proper authentication middleware

### Performance Concerns
- Consider virtualizing the large list in UserTable
- Optimize image loading with next/image
- Add caching for API responses

### Next Steps
1. Fix SQL injection vulnerability (Critical)
2. Add missing useEffect dependencies
3. Consider adding rate limiting
4. Optimize UserTable with virtualization
```

## Configuration

```json
{
  "codeReviewer": {
    "strictMode": false,
    "autoFix": false,
    "focusAreas": [
      "security",
      "performance",
      "typescript",
      "react"
    ],
    "skipPatterns": [
      "*.test.ts",
      "*.spec.ts",
      "*.stories.tsx"
    ]
  }
}
```

## Usage in Vibecoder

```bash
# Review current file
/review

# Review entire PR
/review --pr

# Review specific files
/review src/components/UserList.tsx

# Auto-fix safe issues
/review --fix

# Focus on security only
/review --security
```

## Integration with CI/CD

```yaml
# .github/workflows/code-review.yml
name: Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Code Review
        run: vibecoder review --pr ${{ github.event.pull_request.number }}
      - name: Post Review Comment
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: reviewOutput
            })
```
