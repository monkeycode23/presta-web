import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RegisterSchema } from "../../errors/schemas/auth.schema";
import { request } from "../../services/api/request";
import { parseZodErrors } from "../../errors/utils";
import { useAuthStore } from "../../store/auth.store";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  // comfirmPassword: string;
  terms: boolean;
}

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterInput>({
    name: "",
    email: "",
    password: "",
    // comfirmPassword: "",
    terms: false,
  });

  const store = useAuthStore();
  const [showPass, setShowPass] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<any | null>(null);

  const navigate = useNavigate();


  useEffect(() => {
    
    store.loading= false
    return () => {
      
    }
  }, [])
  
  const updateField = (field: keyof RegisterInput, value: string | boolean) => {
    //if(field === "password") setForm((prev) => ({ ...prev, comfirmPassword: String(value) }));

    setForm((prev) => ({ ...prev, [field]: value }));
  };



  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    try {


      ///validamos del lado del cliente 
      const parsed = RegisterSchema.safeParse(form);

      console.log(parsed);
      if (!parsed.success) {
        setErrors(parseZodErrors(parsed.error));
        return;
      }

      //esperamos respuuesta del servidor
      const response = await store.register(parsed.data);

      if(response.success){
        
        navigate("/");
        return 
      }
      //console.log(response.errors,"responseee");

      setErrors(response.errors);

      //alert("Hubo un error en el registro.");
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Crear Cuenta
        </h1>

        <form onSubmit={register} className="space-y-4">
          <input
            type="text"
            placeholder="nombre de usuario"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {(errors?.name || errors?.username) && (
            <p className="text-red-500 text-sm">
              {errors.name
                ? errors.name
                : errors.username}
            </p>
          )}

          <input
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors?.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Contraseña"
              value={form.password}
              onChange={(e) => {
                // updateField("comfirmPassword", e.target.value)
                updateField("password", e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
            >
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>
          {errors?.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={() => updateField("terms", !form.terms)}
              className="h-4 w-4"
            />
            <span className="text-gray-600 text-sm">
              Acepto los{" "}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => alert("Aquí van los términos y condiciones")}
              >
                términos y condiciones
              </button>
            </span>
          </label>
          {errors?.terms && (
            <p className="text-red-500 text-sm">{errors.terms}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            {store.loading ? "Cargando..." : "Registrarme"}
          </button>
        </form>

        <div className="mt-6 flex flex-col space-y-3">
          <button
            onClick={handleGoogleRegister}
            className="w-full py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition"
          >
            Registrarme con Google
          </button>

          <button
            onClick={() => navigate("/auth/login")}
            className="w-full py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
          >
            Ya tengo cuenta
          </button>
        </div>
      </div>
    </div>
  );
}
