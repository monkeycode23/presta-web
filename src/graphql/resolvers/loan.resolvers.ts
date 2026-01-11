

import UserService from "../../api/services/user.service";
import LoanService from "../../api/services/loan.service";
import Loan from "../../api/models/loan.model";

export  const loanResolvers = {

     getClientLoans:async (_: any, args: any) => {
      try {
        const { clientId,filter } = args;

        const loanService = new LoanService();

        const user = await loanService.getClientLoans(args);

        return user;
      } catch (error: any) {
        return { error: error.message };
      }
    },
}

 


    
   