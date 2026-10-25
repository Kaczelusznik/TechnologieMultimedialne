# Jedna aplikacja Railway: React + Express + Prisma.
FROM node:24-bookworm-slim
WORKDIR /app

# Instalujemy paczki frontendu.
COPY package*.json ./
RUN npm ci --include=dev --no-audit --no-fund

# Instalujemy paczki backendu. Po pierwszym npm install lokalnie
# package-lock.json moze byc dostarczony do obrazu automatycznie.
COPY backend/package*.json ./backend/
RUN cd backend && npm install --include=dev --no-audit --no-fund

COPY . .

# Budujemy front Reacta.
RUN npm run build

# Generujemy typowany klient Prisma, bez laczenia z prawdziwa baza.
RUN cd backend && DATABASE_URL="postgresql://build:build@localhost:5432/build" npm run build

ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app/backend
EXPOSE 3000
CMD ["npm", "run", "start"]
