# install
FROM node:18-alpine AS base
WORKDIR /base
COPY package*.json ./
COPY . .
RUN npm ci -only=prod --omit=dev --ignore-scripts

# build
FROM base AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN npm run build

# run
FROM node:18-alpine AS app
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /build/.next ./.next
COPY --from=build /build/.next/static ./.next/standalone/.next/static
COPY --from=build /build/package*.json ./
COPY --from=build /build/public ./public/
COPY --from=build /build/node_modules ./node_modules/
COPY --from=build /build/next.config.js ./

EXPOSE 3000
ENV NEXTAUTH_SECRET=test123
CMD [ "node", "./.next/standalone/server.js" ]