# sst-test

A repo used for testing Pulumi / SST components provided in other repos

## Quickstart

```bash
pnpm i   # or npm/yarn
pnpm build:resolvers
pnpm test
pnpm deploy  # requires AWS credentials
```

## What you get

- SST v3 config that provisions:
  - AppSync GraphQL API
  - DynamoDB table `Users`
- GraphQL schema with `User` type and CRUD operations
- AppSync JS resolvers (bundled) that forward to DynamoDB
- Tests that mock `@aws-appsync/utils` via `@mikecbrant/appsyncjs-test-utils`

## Notes

- Node.js >= 22 is required.
- Default region is `us-east-2`.
- Tests run with Vitest via `sst load-config -- vitest run`.
- Resolvers are authored in TypeScript under `src/resolvers/**` and bundled to `appsync/` using `@mikecbrant/appsyncjs-cli`.
- The bundle includes `@mikecbrant/appsyncjs-dynamo` so you can write readable request builders instead of hand-crafting expressions.

## AWS access & CI deploys

- Human SSO: Sign in via AWS IAM Identity Center at https://d-9a670e1e2f.awsapps.com/start/ and use your assigned profile for local `sst deploy` when needed.
- CI (GitHub Actions): The deploy workflow at `.github/workflows/sst-deploy.yml` assumes the IAM role provided by the repository variable `AWS_OIDC_ROLE_ARN` and deploys to region `us-east-2` on merges to the default branch (`main`).
