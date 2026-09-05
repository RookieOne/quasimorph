# Contributing

This project uses specification-driven development. Product behavior,
calculation rules, and acceptance criteria are maintained in [`specs/`](./specs/README.md)
alongside the implementation.

## Development workflow

1. Create or update the relevant specification.
2. Resolve or explicitly record unknown game rules.
3. Define observable acceptance criteria.
4. Implement the smallest complete behavior that satisfies the spec.
5. Verify calculations independently from the interface.
6. Update the spec whenever implementation changes the accepted behavior.

A pull request that changes user-visible behavior should normally include its
specification change. Pure fixes that restore already-specified behavior do not
require a new spec.

## Commit messages

Commits follow the [Conventional Commits](https://www.conventionalcommits.org/)
format:

```text
<type>(optional-scope): <description>
```

Use an imperative, lowercase description without a trailing period. Keep each
commit focused on one coherent change.

Common types:

- `feat` — new user-visible behavior
- `fix` — correction to existing behavior
- `docs` — documentation or specifications only
- `refactor` — code restructuring without a behavior change
- `test` — test additions or corrections
- `style` — visual styling changes without application behavior changes
- `build` — dependencies or build configuration
- `ci` — automation and deployment configuration
- `chore` — maintenance not covered by another type

Use a scope when it makes the affected area clearer:

```text
feat(calculator): add class selection
fix(rules): apply resistance modifiers in phase order
style(theme): define industrial color tokens
ci(pages): deploy production build
```

Mark a breaking change with `!` and explain the migration in the commit body:

```text
feat(data)!: revise build document schema
```

## Pull requests

A pull request should:

- explain the user or technical problem it addresses;
- link or name the relevant specification;
- call out game-rule assumptions and their evidence confidence;
- include tests appropriate to the change; and
- include screenshots for material interface changes.

Prefer reviewable vertical slices over large batches of unrelated work.
