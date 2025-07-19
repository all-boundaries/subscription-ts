# Developing

## Overview

This repository serves as a foundation for exploring domain-driven application
architecture and testing methodologies.

## Getting Started :rocket:

To run the application or tests, use the following commands:

```sh
bun run dev   # Start the application
```

```sh
bun run test  # Run all tests
```

> [!IMPORTANT]
> Always use `bun run test` instead of the shorter `bun test` command. The
> shorter version does not account for the necessary configuration.

## Structure :building_construction:

### Application (`src/`)

| Directory/File             | Description                                 |
| -------------------------- | ------------------------------------------- |
| **`subscription/`**        | Contains all subscription-related behavior. |
| **`plumbing/`**            | Application and framework configurations.   |
| **`gateway/`**             | Contains all gateways to dependencies.      |
| **`web/`**                 | General web pages, components, and styles.  |
| **`server-definition.ts`** | Route definitions and orchestration.        |
| **`server.ts`**            | Main server file to run the application.    |

### Testing (`test/`)

| Directory/File | Description                           |
| -------------- | ------------------------------------- |
| **`dom/`**     | Tests requiring DOM access.           |
| **`non-dom/`** | Tests that do not require DOM access. |
| **`_setup/`**  | Framework setup files.                |

The separation of `dom` and `non-dom` tests simplifies configuration. Refer to
the `test:` tasks in [package.json](../package.json) for details on usage.
