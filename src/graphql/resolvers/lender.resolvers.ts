

import UserService from "../../api/services/user.service";


export  const lenderResolvers = {

     getUserLender: (_: any, args: any) => {
      try {
        const { userId } = args;

        const userService = new UserService();

        const user = userService.get({ userId });

        return user;
      } catch (error: any) {
        return { error: error.message };
      }
    },
}

 


    
   