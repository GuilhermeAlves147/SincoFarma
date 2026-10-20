import { useAuth } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  return (
    <div style={{ padding: 32 }}>
      <h1>Olá, {user.name}</h1>
      <p>Dashboard em construção.</p>
      <button onClick={signOut}>Sair</button>
    </div>
  );
}