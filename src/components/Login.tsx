import React, { useState } from "react";
import api from "../api/client";

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { email, password });
      localStorage.setItem("token", response.data.token);
      onLoginSuccess();
    } catch {
      setError("E-mail ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-brand-purple to-white px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-zinc-200 p-8">
        <h2 className="text-2xl font-bold text-center text-zinc-800 mb-6">
          Lista de Mercado 🛒
        </h2>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700">
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-zinc-300 p-2.5 bg-zinc-50 focus:outline-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700">
              Senha
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-zinc-300 p-2.5 bg-zinc-50 focus:outline-emerald-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white p-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition cursor-pointer"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
