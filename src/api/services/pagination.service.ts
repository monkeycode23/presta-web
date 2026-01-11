import { METHODS } from "http";


class PaginationService {
  constructor() {}


  static getPagination(pagination:{page:number,total:number,limit:number}){

    const {limit,page,total} = pagination;
    
      const _limit  = limit ?? 10


    const skip = page ? (page-1)*_limit  : 0

   
    const totalPages = total>_limit ? Math.ceil(total/limit) : 1
    console.log(limit,page,total,totalPages,"paginationnnnnnnnnnnnnn")
     return {
            page:page??1,
            totalPages,
            limit:_limit,
            skip,
            total
        }
  }
 
}

export default PaginationService;
