import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, IdCard, Lock, ArrowRight, Info } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo-sincofarma.svg";
import "./Login.css";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(identifier, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Não foi possível acessar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <header className="login-header">
        <img src={logo} alt="Sincofarma DF" />
      </header>

      <main className="login-main">
        <section className="login-card">
          <div className="login-icon"><ShieldCheck size={22} /></div>
          <h1>Acesso Institucional</h1>
          <p className="login-subtitle">
            Ambiente restrito a Farmacêuticos Responsáveis Técnicos (RT) e
            Gestores Homologados CRF-DF.
          </p>

          <hr />

          <form onSubmit={handleSubmit}>
            <label htmlFor="identifier">NÚMERO DO CRF-DF OU CPF</label>
            <div className="input-wrap">
              <IdCard size={16} />
              <input
                id="identifier"
                type="text"
                placeholder="Ex: CRF 12345/DF ou 000.***.***-00"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>

            <div className="label-row">
              <label htmlFor="password">SENHA DE ACESSO</label>
              <a href="#">Esqueceu a senha?</a>
            </div>
            <div className="input-wrap">
              <Lock size={16} />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Entrando..." : "Acessar Plataforma"}
              <ArrowRight size={16} />
            </button>
          </form>

          <hr />

          <div className="badges">
            <div className="badge">
              <span className="badge-tag">ICP</span>
              <div>
                <strong>ICP-Brasil</strong>
                <small>Certificação Digital Homologada</small>
              </div>
            </div>
            <div className="badge">
              <span className="badge-tag">LGPD</span>
              <div>
                <strong>Em Conformidade</strong>
                <small>Dados em Saúde Protegidos</small>
              </div>
            </div>
          </div>

          <div className="notice">
            <Info size={14} />
            <p>
              <strong>Aviso RNDS:</strong> As sessões clínicas, receituários e
              triagens homologadas são sincronizados com a Rede Nacional de
              Dados em Saúde (Ministério da Saúde).
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}