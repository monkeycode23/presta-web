  
  import { ZodError } from "zod";
  
  export function parseZodErrors(error: ZodError) {
  const errors: Record<string, string> = {};

  error.issues.forEach((issue) => {
    const field = issue.path[0] as string;

    // Solo guardamos el primer error por campo
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  });

  return errors;
}