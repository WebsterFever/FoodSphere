# FoodSphere Architecture

## Phase 0 — Repository Audit and Architecture

FoodSphere is starting from a clean repository. The application will use a TypeScript monorepo and will be implemented incrementally.

## Core architecture

- Frontend: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query
- API: NestJS, TypeScript, REST, Swagger/OpenAPI
- Database: Railway PostgreSQL with Prisma ORM
- Cache: Railway Redis
- Authentication: Firebase Authentication; NestJS validates Firebase ID tokens
- Realtime: Firestore only for features that benefit from realtime updates
- Images: AWS S3 with CloudFront
- Email: AWS SES
- Async image processing: AWS Lambda
- External recipes: Spoonacular
- AI: OpenAI API through the NestJS API only
- Frontend hosting: Vercel
- Backend hosting: Railway

## Data ownership

PostgreSQL on Railway is the source of truth for application business data. Firestore must not duplicate the relational database.

## Planned monorepo

```text
apps/
  web/
  api/
packages/
  ui/
  types/
  config/
infrastructure/
  aws/
  railway/
docs/
.github/workflows/
```

## PostgreSQL / Prisma domain

Planned models:
User, Recipe, Diet, Ingredient, RecipeIngredient, Favorite, Collection, CollectionRecipe, Review, Comment, MealPlan, MealPlanItem, ShoppingList, ShoppingListItem, RecipeImage, EmailVerificationToken, Notification.

Recipe and Diet maintain a many-to-many relationship. Recipes can have SPOONACULAR or USER sources.

## Railway PostgreSQL

Production and hosted development databases will use Railway PostgreSQL through DATABASE_URL.

Prisma will own schema migrations. Credentials and Railway connection strings must never be committed.

## Authentication

Firebase handles identity. NestJS validates Firebase ID tokens and maps Firebase UID to an internal PostgreSQL User. Roles and authorization are enforced server-side.

## Email verification

Email/password registration creates the Firebase identity and PostgreSQL User in PENDING_VERIFICATION state. The API generates a secure random token, stores only its hash with expiration, and sends the raw token through an AWS SES verification link. Tokens are single-use.

## Migration strategy

Because the repository currently has no legacy application source code, there is no destructive migration. Build the modern foundation first, then add features phase by phase.

## Development phases

0. Repository audit and architecture
1. Modern monorepo structure
2. Railway PostgreSQL + Prisma
3. Firebase authentication
4. AWS SES email verification
5. Core recipe API + Spoonacular
6. Modern Next.js frontend
7. AWS S3 + CloudFront image uploads
8. Favorites, collections, reviews
9. Railway Redis caching
10. Firestore realtime features
11. AI Recipe Assistant
12. AI Meal Planner and Fridge AI
13. Admin dashboard
14. Testing and security
15. CI/CD and production deployment
