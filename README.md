#  Shopify Clone: Premium Multi-Tenant E-commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

A high-performance, modern, and fully-featured Shopify clone built with the latest web technologies. This platform supports multi-tenancy, allowing multiple merchants to host their own unique storefronts on a single infrastructure.

## Core Features

### Multi-Tenant Architecture
- **Dynamic Subdomain Routing**: Seamlessly map subdomains to individual store instances.
- **Isolated Data Layers**: Securely partitioned data for products, orders, and customers.

### Merchant Experience (Admin Panel)
- **Intuitive Dashboard**: Real-time sales analytics and traffic visualization.
- **Product Management**: Full CRUD operations with support for variants, inventory tracking, and high-resolution image uploads.
- **Order Fulfillment**: Efficiently manage incoming orders and track fulfillment status.

### Storefront Experience
- **Premium Design System**: Modern, responsive, and high-quality storefront layouts.
- **Real-Time Shopping Cart**: Smooth state management for a seamless add-to-cart experience.
- **Secure Checkout**: Integrated with Stripe for globally trusted payment processing.

## Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Database**: [PostgreSQL (Supabase)](https://supabase.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)


### How to run the project

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd shopify_clone
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file and add your credentials (see [PROJECT_GUIDE.md](./PROJECT_GUIDE.md) for details).

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```




