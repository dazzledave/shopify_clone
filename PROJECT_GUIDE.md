# Shopify Clone: Technical Guide & Documentation

## 1. Project Overview
This project is a high-performance, multi-tenant e-commerce platform built with Next.js. It allows multiple merchants to create and manage their own online stores, each accessible via a unique subdomain.

## 2. Technical Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Design System**: Shadcn/UI (Radix UI), Lucide Icons, Framer Motion
- **State Management**: Zustand
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: NextAuth.js (Google, GitHub, Credentials)
- **Image Storage**: Cloudinary
- **Payments**: Stripe

## 3. Core Architecture

### 3.1 Multi-Tenancy
The application uses a **Shared Database, Shared Schema** approach. Every tenant (store) is identified by a `subdomain`.
- **Middleware Routing**: `middleware.ts` intercepts requests and rewrites them based on the `host` header.
- **Data Isolation**: All product, order, and customer queries are scoped by `storeId`.

### 3.2 Routing Structure
- `app/(admin)`: Merchant Dashboard for store management.
- `app/(storefront)/[subdomain]`: Customer-facing storefront.
- `app/api`: Backend routes for authentication, webhooks, and data fetching.

## 4. Feature Specifications

### Merchant Dashboard
- **Analytics**: Real-time sales and traffic visualization.
- **Inventory**: Advanced product management with variants (size, color) and stock tracking.
- **Orders**: Fulfillment workflow and payment status monitoring.
- **Customization**: Store branding, navigation, and settings.

### Storefront Experience
- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Dynamic Catalog**: Real-time search and smart filtering.
- **Seamless Checkout**: Integrated Stripe checkout with automated order creation.

## 5. Getting Started

### Prerequisites
- Node.js 18+
- Supabase Account (PostgreSQL)
- Cloudinary Account (Image Storage)
- Stripe Account (Payments)

### Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# OAuth
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Stripe
STRIPE_API_KEY="..."
STRIPE_WEBHOOK_SECRET="..."
```

### Installation
```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

## 6. Database Schema (Prisma)
The schema is designed for scalability and data integrity, featuring relations between Users, Stores, Products, and Orders.

---
*Created by Antigravity*
