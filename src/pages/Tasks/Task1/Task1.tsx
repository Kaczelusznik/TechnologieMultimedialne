import { useState } from "react";

export default function Task1() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(isRegistering ? "Rejestracja:" : "Logowanie:", login);
  }

  return (
    <div className="container py-5 text-center">
      <h1>
        {isRegistering ? "Rejestracja do KaczKuszki.pl" : "Logowanie do KaczKuszki.pl"}
      </h1>

      <form
        className="d-flex flex-column align-items-center gap-3"
        onSubmit={handleSubmit}
      >
        <label className="form-label">Login</label>
        <input
          type="text"
          placeholder="Login"
          className="form-control w-25 text-center"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />

        <label className="form-label">Hasło</label>
        <input
          type="password"
          placeholder="Hasło"
          className="form-control w-25 text-center"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-primary w-25">
          {isRegistering ? "Zarejestruj" : "Zaloguj"}
        </button>
      </form>

      <button
        type="button"
        className="btn btn-link mt-3"
        onClick={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering ? "Mam już konto" : "Nie mam konta"}
      </button>
    </div>
  );
}