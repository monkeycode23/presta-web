import axios from "axios";
import { useAuthStore } from "../../store/auth.store";

// =========================
// CONFIG BASE
// =========================

export type TRequestMethod = "GET" | "POST" | "PUT" | "DELETE";
// Usa la variable de entorno si existe, si no usa localhost
const API_BASE_URL = /* import.meta.env.VITE_API_URL ||  */"http://localhost:2567/api";

// Instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================
// INTERCEPTOR: agrega token automáticamente
// =========================

api.interceptors.request.use(
  (config) => {
    
    /* const store = localStorage.getItem("user-store");
    const token = store ? JSON.parse(store).state.token : null; */
    const token = useAuthStore.getState().token;
   // console.log(token)

    if (token) {  
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// ==========
// RESPONSE INTERCEPTOR
// ==========

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) return Promise.reject(error);

    const data = error.response.data;

   // console.log(data,"intercepto")
    // === token expirado del servidor ===
    
     if (data.errors.session || data?.errors?.token === "expired" ) {
      const { setToken, logout } = useAuthStore.getState();

      try {
        // === pedir nuevo token ===
        const refreshRes = await api.get("/auth/refresh",);

        console.log(refreshRes,"refreshRes")

        const newAccess = refreshRes.data.token;
        //const newRefresh = refreshRes.data.data.refreshToken;

        // === actualizar zustand ===
        setToken(newAccess);

        // === volver a intentar la petición original ===
        error.config.headers.Authorization = `Bearer ${newAccess}`;
       
        return api(error.config);

      } catch (refreshErr) {
        console.log("Refresh token inválido → logout forzado");

        logout();
        //window.location.href = "/login";

        return Promise.reject(refreshErr);
      }
    } 

    return Promise.reject(error);
  }
);




interface RequestOptions<T = any> {
  method?:TRequestMethod 
  url: string;
  data?: T;
  params?: Record<string, any>;
  onSuccess?: (data:any)=>void;
  onError?:(data:any)=>void;
}

interface ApiResponse<T = any> {
  
};

export async function request<T = any>(options: RequestOptions): Promise<any> {
  try {
    const res = await api({
      method: options.method || "GET",
      url: options.url,
      data: options.data,
      params: options.params,
    });

    console.log(res)

    return res.data

    
  } catch (err: any) {
    
    console.log(err.response.data,"from request")
    return {
      success: false,
      errors: err.response?.data.errors  ? {
        ...err.response?.data.errors,
      } : {
        message: err.message,
      }
    };
  }
}
