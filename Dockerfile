# Imagen oficial de Node.js
FROM node:22-slim

# Habilitar pnpm
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.16.0 --activate

# Asegurar devDependencies durante el build
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

# Copiar manifiestos antes para aprovechar cache
COPY package.json pnpm-lock.yaml* ./

# Instalar SIEMPRE con devDeps en dev
RUN pnpm install --frozen-lockfile --prod=false && echo "Dependencias (incluye dev) instaladas"

# Copiar el resto del código (no compila en dev)
COPY . .

EXPOSE 3000 9229

# En dev usamos ts-node, no necesitamos build
CMD ["pnpm", "run", "dev"]