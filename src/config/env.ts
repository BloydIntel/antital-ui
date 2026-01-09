/**
 * Environment configuration constants
 * Computed once at module load time for better performance
 */

// In Next.js, NODE_ENV is replaced at build time
// This is safe to use in client components as it's replaced during the build process
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

// Alternative: Use NEXT_PUBLIC_ prefixed env var if you need runtime configuration
// export const IS_DEVELOPMENT = process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === 'true'
