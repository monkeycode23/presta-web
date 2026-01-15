/* import { StrictMode } from 'react' */
import './index.css'
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  /* import { setContext } from "@apollo/client/link/context"; */
 import { ApolloProvider } from "@apollo/client/react"; 

  import { ApolloClient,  InMemoryCache, HttpLink } from "@apollo/client";
import { Toaster } from 'sonner';

 const httpLink = new HttpLink({
    uri: "http://localhost:2567/graphql",
  });

  export const client = new ApolloClient({
    link: httpLink/* errorLink.concat(authLink.concat(httpLink))*/ ,
    cache: new InMemoryCache(),
  });
  
  /*  */

  /* createRoot(document.getElementById("root")!).render(<App />);
  
 */
/* 

   */
  //import { useUserStore } from "./store/userStore.tsx";
  
/*   
  import { onError } from "@apollo/client/link/error";
  
  // Link para manejar errores globalmente
  const errorLink = onError((err) => {
  
    
  });
  const httpLink = new HttpLink({
    uri: "http://localhost:2567/graphql",
  }); */
  // Middleware para añadir el token
  /* const authLink = setContext((_, { headers }) => {
    
    
    const token = useUserStore.getState().token;   // O donde lo guardes
  
    
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }); */
  
  
 /*  
   */
    createRoot(document.getElementById("root")!).render(
     /*  <ApolloProvider client={client}> */
       <ApolloProvider client={client}> 
        <App />
         <Toaster />
      </ApolloProvider>  
    );
    