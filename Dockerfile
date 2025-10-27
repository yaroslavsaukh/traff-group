FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Copy only package metadata and lockfile first for efficient caching
COPY package.json pnpm-lock.yaml ./

# Install pnpm and build dependencies
RUN npm install -g pnpm

# Copy the rest of the sources and install full deps, then build
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM node:20-alpine AS runner
WORKDIR /usr/src/app

# Copy package metadata and lockfile so we can install only production deps
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --prod --frozen-lockfile

# Copy built assets from builder
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
