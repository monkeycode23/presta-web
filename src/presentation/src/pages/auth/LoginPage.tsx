import { useState } from "react";
import { useNavigate } from "react-router";
import { LoginSchema } from "../../errors/schemas/auth.schema";
import { request } from "../../services/api/request";
import { parseZodErrors } from "../../errors/utils";
import { useAuthStore } from "../../store/auth.store";

/**componenteeeeeee! */
export default function LoginPage() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  /* const [errors, setErrors] = useState<any>(null); */

  const navigate = useNavigate();
  const store = useAuthStore();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar login
    const loginData = { email, password };
    const parsedLogin = LoginSchema.safeParse(loginData);

    if (!parsedLogin.success) {
      console.log("Errores de login:", parsedLogin.error.format());
      store.setErrors(parseZodErrors(parsedLogin.error));
      return;
    } 
    
    else {
      // Llamar a la API
      try {
        
        const response = await store.login({...parsedLogin.data,rememberMe})

        if(response) navigate("/");
        
      } catch (err) {
        console.error(err);
        alert("Error al iniciar sesión");
      }
    }
  };

  const handleGoogleLogin = () => {
    // Redirigir a tu endpoint de OAuth
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Iniciar Sesión
        </h1>

        <form onSubmit={login} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
            {(store.errors?.email) && (
            <p className="text-red-500 text-sm">
              {store.errors.email
                }
            </p>
          )}
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

    {(store.errors?.password) && (
            <p className="text-red-500 text-sm">
              {store.errors.password
                }
            </p>
          )}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4"
              />
              <span className="text-gray-600 text-sm">Recordarme</span>
            </label>

            <button
              type="button"
              onClick={() => navigate("/auth/register")}
              className="text-blue-600 text-sm hover:underline"
            >
              Crear cuenta
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            {store.loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

        <div className="mt-6 flex flex-col space-y-3">
         {/*  <button
            onClick={handleGoogleLogin}
            className="w-full py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition"
          >
            Iniciar sesión con Google
          </button> */}
        </div>
      </div>
    </div>
  );
}
