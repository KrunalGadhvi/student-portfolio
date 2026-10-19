# Stage 1: Build Environment
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source and compile production bundle
COPY . .
RUN npm run build

# Stage 2: Lightweight Production Serving Layer (Multi-Stage Build - Supplementary Problem 2)
FROM node:18-alpine

WORKDIR /app

# Copy compiled assets from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install only production server dependencies
RUN npm install --omit=dev

# Expose Vite preview port
EXPOSE 5173

# Serve with host binding for Docker networking
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
