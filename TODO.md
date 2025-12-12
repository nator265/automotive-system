# Refactor Next.js Project to Use Mongoose Consistently

## Tasks
- [ ] Update models/User.ts to add verificationToken field
- [ ] Refactor app/api/auth/register/route.ts to use User model instead of native MongoDB
- [ ] Refactor app/api/cars/add/route.ts to use Vehicle model instead of native MongoDB
- [ ] Add TypeScript types to app/api/cars/[id]/route.ts for params
- [ ] Check and refactor other auth routes if they use native MongoDB driver
- [ ] Test all API routes for functionality
- [ ] Run application and check for TypeScript/runtime errors
