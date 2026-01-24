

import { Outlet, Navigate } from "react-router";

import { useEffect } from "react";
import UserDefaultLayout from "./layouts/UserDefaultLayout";
 import { gql } from "@apollo/client"; 
 import  { useQuery, useLazyQuery } from "@apollo/client/react";  
/* import { client } from "../main"; */ // donde creaste el ApolloClient
import { jwtDecode } from "jwt-decode";
//import { useLazyQueryAuth } from "../hooks/useLazyQuery";
import { useAuthStore } from "../store/auth.store";

 const GET_USER = gql`
  query getAuthUser($userId: ID!) {
    getAuthUser(userId: $userId) {
      _id
      username
      email
      roles{
        name
        permissions
      }
      avatar
    }
  }
`; 

const PrivateRoute = () => {

  const token = useAuthStore((state) => state.token);

  console.log("asdasd",token)
 

   const [_user,{data,loading,error}] = useLazyQuery(GET_USER); 
 
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      const decoded = jwtDecode(token) as any;
      if (!decoded) return;

      const userId = decoded.data.userId;
      console.log(userId)

       const response:any = await _user({
        variables: { userId },
      });


      
      useAuthStore.setState({ user: response.data.getAuthUser });
      console.log(response, "user fetched");  
    };

    fetchData();
  }, [token]); // importante: depende del token

  return token ? (<UserDefaultLayout><Outlet /></UserDefaultLayout>) : (<Navigate to="/auth/login" />);
};

export default PrivateRoute;



