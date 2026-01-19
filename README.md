# Antital UI

A modern React investment platform built with Next.js, TypeScript, and Tailwind CSS.

## Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/BloydIntel/antital-ui.git
cd antital-ui
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors automatically
- `pnpm type-check` - Run TypeScript type checking

## Git Workflow

### Development Rules

1. **Always create a branch from main**
   - Never commit directly to `main`
   - Ensure your local `main` branch is up to date before creating a new branch
   - Use descriptive branch names (e.g., `feature/user-authentication`, `fix/mobile-scroll-issue`)

2. **Make your changes**
   - Write clean, well-documented code
   - Follow the project's coding standards and conventions
   - Commit frequently with clear, descriptive commit messages

3. **Create a Pull Request**
   - Open a pull request from your feature branch to `main`
   - Provide a clear title and description of your changes
   - Reference any related issues or tickets

4. **Resolve Copilot Comments**
   - Review all comments from GitHub Copilot and other reviewers
   - Address all feedback before requesting another review
   - Make additional commits to your branch as needed to resolve comments

5. **Merge the Pull Request**
   - Wait for approval before merging
   - Ensure all comments are resolved
   - Use appropriate merge strategy (squash and merge recommended)
   - Delete the feature branch after merging

## Tech Stack

- **Framework**: Next.js 15.5.9
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Package Manager**: pnpm
