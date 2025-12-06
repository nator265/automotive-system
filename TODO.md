# TODO: Implement Login and Authentication System

## 1. Install NextAuth.js
- Install next-auth package
- Install @auth/prisma-adapter if needed, but since using Mongoose, use custom adapter

## 2. Set up Authentication Configuration
- Create app/api/auth/[...nextauth]/route.ts for NextAuth configuration
- Configure CredentialsProvider with sample users (test1 admin, test2 user, password pass123)
- Set up session handling

## 3. Create Login Page
- Create app/login/page.tsx with modern UI using Tailwind CSS and Material-UI icons
- Form with username and password fields
- Handle login submission and redirect based on role

## 4. Protect Dashboard
- Update app/dashboard/layout.tsx to check for authentication and admin role
- Redirect non-admin users away from dashboard

## 5. Create Client Page for Users
- Create app/client/page.tsx for user dashboard
- Include sections: purchase history, score, discounts, special deals, notifications, blog

## 6. Implement Client Page Features
- Fetch and display user's purchase history (from sales data)
- Show user score and discounts
- Display special deals for the user
- Show notifications
- Integrate blog posts

## 7. Update Navigation and Redirects
- Update root page or nav to redirect to login if not authenticated
- Ensure proper redirects after login based on role

## 8. Test Authentication Flow
- Test login with test1 (admin) -> dashboard
- Test login with test2 (user) -> client page
- Verify protection of routes
