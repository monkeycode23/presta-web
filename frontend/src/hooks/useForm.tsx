import { useEffect } from "react";
import { type ZodSchema } from "zod";
import useFormStore from "../store/form.store";
import { request,type TRequestMethod} from "../services/api/request";
import { toast } from "sonner";
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

interface UseZodFormProps<T> {
  name: string;
  schema: ZodSchema<T>;
  initialValues: Partial<T>;
  onSubmit?: (data: T) => Promise<void> | void;
}

export function useForm<T>({
  name,
  schema,
  initialValues,
  onSubmit,
}: UseZodFormProps<T>) {
  const {
    inputs,
    errors,
    loading,
    setValue,
    setErrors,
    resetErrors,
    setLoading,
    setForm,
    resetForm,
  } = useFormStore();

  // inicializar form
  useEffect(() => {
    setForm({
      name,
      inputs: initialValues,
      errors: {},
      loading: false,
    });

    return () => resetForm();
  }, [name]);

  const validate = (): T | null => {
    resetErrors();

    const result = schema.safeParse(inputs);

    

    if (!result.success) {
      const fieldErrors: Record<string, string> = parseZodErrors(result.error);
      setErrors(fieldErrors);
      return null;
    }

    return result.data;
  };

  const handleSubmit = async (
    query: { url: string; method: TRequestMethod },
    onSuccess: any
  ) => {
    
    const data = validate();
    if (!data){console.log(errors) ; return;}

    try {
      /* if (!data) throw new Error("No data provided"); */
      //set({ loading: true, errors: null });

      const response = await request({
        url:query.url,
        method:query.method,
        data: data,
      });

      if (!response.success) {
         setErrors(response.errors);
        throw new Error("Server Validation Error")
      }
      const token = response.data.token;
      
      if(onSuccess) onSuccess(response.data)
    } catch (error:any) {
      console.error("Error en login:", error);
      if(error.message == "Server Validation Error") return 
     
      toast.error("Lo siento error del servidor ")

    } finally {
      setLoading(false);
    }
  };

  return {
    values: inputs as T,
    errors,
    loading,
    setValue,
    handleSubmit,
  };
}
