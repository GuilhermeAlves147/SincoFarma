import { api } from "./api";

export async function login(identifier, password) {
  // enquanto não há backend
  await new Promise((r) => setTimeout(r, 600));
  if (password === "12345678") {
    return { token: "fake-token", user: { name: "Capitao caverna", identifier } };
  }
  throw new Error("Credenciais inválidas.");

}