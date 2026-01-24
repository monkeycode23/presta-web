import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { useAuthStore } from "../store/auth.store.ts";

const API_BASE_URL = import.meta.env.VITE_LOCAL_DOMAIN;

const API_PROD_BASE_URL = import.meta.env.VITE_REMOTE_DOMAIN;

const uri =
  import.meta.env.VITE_ENVIROMENT === "dev" ? API_BASE_URL : API_PROD_BASE_URL;

console.log(uri);

const httpLink = new HttpLink({
  uri: uri + "/graphql",
});

const authLink = setContext(async (operation, prevContext) => {
  const token = useAuthStore.getState().token;

  return {
    headers: {
      ...prevContext.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const errorLink = onError((graphqlError: any) => {

  const errors = graphqlError.error.errors;
  for (const err of errors) {
    
    if (err.extensions?.code === "UNAUTHENTICATED") {
      console.warn(`[Auth Error]: ${err.message}`);

      useAuthStore.getState().logout();
      
      window.location.href = "/auth/login"; 
    }
  }
});

export const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authLink,
    httpLink,
  ]), 
  cache: new InMemoryCache(),
});
