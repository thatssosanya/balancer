# Balancer

Welcome to the Balancer monorepo! It uses turborepo and contains the following:

- apps/web: The Next.js client.
- apps/api: The Nest.js API.
- packages/ui: The UI components and utilities.
- packages/features: The reusable features.
- packages/tsconfig: The base TS configs.
- packages/eslint-config-custom: Custom ESLint configuration for the project.

## Setup

Thanks to turborepo the setup should be fairly simple:

```bash
# 1. Clone the repo
git clone https://github.com/thatssosanya/balancer

# 2. Navigate to the repo's root
cd balancer

# 3. Install the dependencies (this will install all of the required dependencies as well as run some postinstall scripts)
npm i

# 4. Set up environment variables in .env.local files according to .env.example files (this will copy every .env.example to an .env.local in the same directory)
find . -name ".env.example" -print0 | xargs -0 -I{} sh -c 'cp "{}" "$(dirname "{}")/.env.local"'

# 5. Start the dev servers
turbo run dev

# Beautiful! You can now access the client and the API.
# Visit http://localhost:3000 to use the client
# Use http://localhost:8000 for API requests
