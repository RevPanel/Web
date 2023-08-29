# Daemon

This repository contains the frontend and backend for the web panel.

## Installation

```bash
pnpm install
```

## Running the app

```bash
# Copy and configure the environment variables
cp .env.example .env.production

# Update database
pnpm run migrate:run

# Build the app
pnpm run build

# Run the app
pnpm run start
```

## Contributing

In order to contribute you can run the following commands to create a local instance:

```bash
cp .env.example .env.local
pnpm run migrate:run
pnpm run dev
```
