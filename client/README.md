This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Commands

To run development server:

```bash
yarn dev
```

To run codegen from backend api:

```bash
. ./scripts/generate-axios
```

Your codegen'ed interfaces will exist under ./services/swagger/index.ts, and be hooked up through backendApiClient.ts
