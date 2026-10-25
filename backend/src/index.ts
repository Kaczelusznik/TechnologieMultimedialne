import "dotenv/config";
import express from "express";
import path from "node:path";
import argon2 from "argon2";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

const databaseUrl = process.env.DATABASE_URL;
const sessionSecret = process.env.SESSION_SECRET;

if (!databaseUrl || !sessionSecret) {
  throw new Error("Brakuje DATABASE_URL lub SESSION_SECRET w zmiennych środowiskowych.");
}

const app = express();
const port = Number(process.env.PORT) || 3000;
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl })
});

// Railway korzysta z HTTPS przed naszym serwerem Express.
app.set("trust proxy", 1);
app.use(express.json());

// Sesje przechowywane w PostgreSQL, także po restarcie serwera.
const PgStore = connectPgSimple(session);
app.use(session({
  store: new PgStore({
    conString: databaseUrl,
    createTableIfMissing: true
  }),
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 1000
  }
}));

// Prosty test API
app.get("/api/health", (_req, res) => {
  res.json({ message: "The duck is spinning! 🦆" });
});

// Rejestracja
app.post("/api/register", async (req, res) => {
  const { login, password } = req.body ?? {};

  if (typeof login !== "string" || typeof password !== "string" ||
      !login.trim() || !password) {
    return res.status(400).json({ message: "Login i hasło są wymagane." });
  }

  if (login.trim().length > 50 || password.length > 50) {
    return res.status(400).json({ message: "Login lub hasło są za długie (maks. 50 znaków)." });
  }

  try {
    const name = login.trim();
    const found = await prisma.users.findUnique({ where: { login: name } });
    if (found) {
      return res.status(409).json({ message: "Login jest zajęty." });
    }

    await prisma.users.create({
      data: {
        login: name,
        password_hash: await argon2.hash(password)
      }
    });

    return res.status(201).json({ message: "Nowa KaczKuszka wylądowała w stawie! 🦆" });
  } catch (error) {
    console.error("Błąd rejestracji:", error);
    return res.status(500).json({ message: "Nie udało się zarejestrować użytkownika." });
  }
});

// Logowanie
app.post("/api/login", async (req, res) => {
  const { login, password } = req.body ?? {};

  if (typeof login !== "string" || typeof password !== "string" ||
      !login.trim() || !password) {
    return res.status(400).json({ message: "Login i hasło są wymagane." });
  }

  try {
    const user = await prisma.users.findUnique({
      where: { login: login.trim() }
    });

    if (!user || !(await argon2.verify(user.password_hash, password))) {
      return res.status(401).json({ message: "Niepoprawny login lub hasło." });
    }

    // Nowy identyfikator sesji po udanym logowaniu.
    req.session.regenerate((error) => {
      if (error) {
        return res.status(500).json({ message: "Błąd sesji." });
      }
      req.session.userId = user.id;
      req.session.save((error) => {
        if (error) {
          return res.status(500).json({ message: "Błąd zapisywania sesji." });
        }
        return res.json({ message: "Zalogowano pomyślnie!" });
      });
    });
  } catch (error) {
    console.error("Błąd logowania:", error);
    return res.status(500).json({ message: "Błąd serwera podczas logowania." });
  }
});

// Stan zalogowania
app.get("/api/me", (req, res) => {
  res.json({ loggedIn: Boolean(req.session.userId) });
});

// Wylogowanie
app.post("/api/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: "Błąd wylogowania." });
    }
    res.clearCookie("connect.sid", { path: "/" });
    return res.json({ message: "Wylogowano!" });
  });
});

// Express udostępnia zbudowanego Reacta (BEZ Caddy).
const frontend = path.resolve(process.cwd(), "../dist");
app.use(express.static(frontend));

// React Router: odświeżanie /z1, /z2 itd. bez 404.
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ message: "Nieznany adres API." });
  }
  if (req.method !== "GET") return next();
  return res.sendFile(path.join(frontend, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log("Knight is riding a horsey PRRRRT");
  console.log(`The duck is spinning on port: ${port}`);
});
