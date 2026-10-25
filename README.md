# Technologie Multimedialne

12 zadań laboratoryjnych — React + TypeScript + Tailwind, Express + Prisma, PostgreSQL.

Z1: rejestracja, logowanie, sesja (zapis w PostgreSQL), wylogowanie.

## Railway — jeden serwis dla frontendu i backendu

1. Wyślij zawartość tego katalogu na GitHub.
2. W Railway otwórz **istniejący serwis frontendu** i ustaw:
   - **Root Directory:** `/`
   - **Builder:** Dockerfile (plik `Dockerfile` w katalogu głównym)
   - **Start Command:** usuń ewentualne nadpisanie (Dockerfile startuje Express)
   - **Public Networking / Port:** `3000`
3. W tym samym serwisie (tym, na którym ma działać strona) ustaw w **Variables**:
   - `DATABASE_URL` — **Reference** do `Postgres.DATABASE_URL`
   - `SESSION_SECRET` — losowy, długi sekret; *nie* wysyłaj go na GitHuba
   - `NODE_ENV` — `production`
   - `PORT` — `3000`
4. Usuń już niepotrzebną zmienną `BACKEND_HOST` (jeśli jest).
5. Wdróż nowy kod; nie usuwaj jeszcze osobnego backendu.
6. Sprawdź publiczne adresy `/api/health` i `/api/me` (ten drugi daje `loggedIn: false` lub `true`), a potem `/z1`.
7. Po udanych testach możesz wyłączyć stary osobny serwis backendowy. **Nie usuwaj PostgreSQL.**

Ważne: na Railway używamy wewnętrznego adresu PostgreSQL z reference; lokalnie w `.env` potrzebujesz publicznego adresu bazy.

## Lokalnie

Backend (osobny terminal):

```powershell
cd backend
npm install
Copy-Item .env.example .env
# W .env wpisz własny DATABASE_URL i SESSION_SECRET
npm run build
npm run dev
```

Frontend (drugi terminal, z katalogu głównego):

```powershell
npm ci
npm run dev
```

Otwórz `http://localhost:5173/z1`. Vite sam kieruje `/api` do Expressa na `localhost:3000`.

## Struktura

- `src/pages/Home.tsx` — 12 linków do zadań
- `src/pages/Tasks/Task1/Task1.tsx` — formularz logowania/rejestracji
- `backend/src/index.ts` — API oraz serwowanie Reacta w produkcji
- `backend/prisma/schema.prisma` — istniejąca tabela `users`
- `Dockerfile` — budowa jednej aplikacji Railway, bez Caddy

Nie uruchamiaj `prisma db push` na produkcyjnej bazie: tabela `users` już istnieje. `prisma generate` tylko generuje kod klienta.
