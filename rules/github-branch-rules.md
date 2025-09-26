## GitHub Branch Protection Rules

### Main Branch Rule
- Branch pattern: main
- Require pull request reviews (minimum 2).
- Dismiss stale approvals on changes.
- Require review from CODEOWNERS file.
- Require status checks to pass (e.g., CI tests, linting).
- Require branches to be up to date before merging.
- Include administrators in rules.
- Require linear history (no merge commits).

### Develop Branch Rule
- Branch pattern: develop
- Require pull request reviews (minimum 1).
- Require status checks to pass.
- Require branches to be up to date.

### Feature Branch Rules
- Branch pattern: feature/*
- Require status checks (e.g., lint, tests, build).
- Enforce naming convention (e.g., feature/[category]_[number]_[name]).
- Auto-delete on merge.

### Staging Branch Rule
- Branch pattern: staging
- Require pull request reviews (minimum 2).
- Require all tests and previews to pass.
