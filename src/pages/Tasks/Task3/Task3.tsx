import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function Task3() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  // Czy użytkownik ma już aktywną sesję?
  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setLoggedIn(Boolean(data.loggedIn)))
      .catch(() => setLoggedIn(false));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Walidacja haseł przy rejestracji
    if (isRegistering && password !== confirmPassword) {
      alert("Hasła nie są takie same!");
      return;
    }

    try {
      const response = await fetch(
        `/api/${isRegistering ? "register" : "login"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ login, password })
        }
      );

      const data = await response.json();
      alert(data.message);

      if (response.ok) {
        setPassword("");
        if (isRegistering) {
          setIsRegistering(false);
        } else {
          setLoggedIn(true);
        }
      }
    } catch {
      alert("Nie można połączyć się z serwerem.");
    }
  }

  async function logout() {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include"
      });
      if (!response.ok) throw new Error("Błąd wylogowania");

      setLoggedIn(false);
      setLogin("");
      setPassword("");
    } catch {
      alert("Nie można wylogować się z serwera.");
    }
  }

  return (
    <main className="min-h-screen px-5 py-12 text-center">
      <Link to="/" className="mb-8 inline-block text-lime-300 hover:underline">
        ← Strona główna
      </Link>

      <h1 className="mb-8 text-3xl font-black text-lime-300">
        {loggedIn
          ? "Panel KaczKuszki.pl"
          : isRegistering
            ? "Rejestracja do KaczKuszki.pl"
            : "Logowanie do KaczKuszki.pl"}
      </h1>

      {loggedIn === null ? (
        <p>Sprawdzanie sesji...</p>
      ) : loggedIn ? (
        <div>
          <h2 className="mb-6 text-xl">Witaj w KaczKuszki.pl! 🦆</h2>
          <button
            type="button"
            onClick={logout}
            className="cursor-pointer rounded-lg border border-lime-700 bg-neutral-800 px-8 py-3 text-lime-300 hover:bg-neutral-700"
          >
            Wyloguj się
          </button>
        </div>
      ) : (
        <div>
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-sm flex-col gap-4"
          >
            <label htmlFor="login">Login</label>
            <input
              id="login"
              type="text"
              placeholder="Login"
              autoComplete="username"
              className="w-full rounded-lg border border-neutral-500 bg-neutral-900 px-4 py-3 text-center text-white focus:border-lime-400 focus:outline-none"
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              required
            />

            <label htmlFor="password">Hasło</label>
            <input
              id="password"
              type="password"
              placeholder="Hasło"
              autoComplete={isRegistering ? "new-password" : "current-password"}
              className="w-full rounded-lg border border-neutral-500 bg-neutral-900 px-4 py-3 text-center text-white focus:border-lime-400 focus:outline-none"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            {isRegistering && (
              <input
                type="password"
                className="w-full rounded-lg border border-neutral-500 bg-neutral-900 px-4 py-3 text-center text-white focus:border-lime-400 focus:outline-none"
                placeholder="Powtórz hasło"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                  required
              />
            )}

            <button
              type="submit"
              className="cursor-pointer rounded-lg border border-lime-700 bg-neutral-800 px-4 py-3 text-lime-300 hover:bg-neutral-700"
            >
              {isRegistering ? "Zarejestruj" : "Zaloguj"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="mt-5 cursor-pointer text-lime-300 hover:underline"
          >
            {isRegistering ? "Mam już konto" : "Nie mam konta"}
          </button>
        </div>
      )}
    </main>
  );
}
