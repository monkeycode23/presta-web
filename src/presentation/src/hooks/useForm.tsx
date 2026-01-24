import { useEffect } from "react";
import { type ZodSchema } from "zod";
import useFormStore from "../store/form2.store";
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
}: UseZodFormProps<T>) {

  const {
    setValue,
    setErrors,
    resetErrors,
    setLoading,
    setForm,
    resetForm,
  } = useFormStore();

  const form = useFormStore(
    (s) => s.forms[name] ?? {
      inputs: initialValues,
      errors: {},
      loading: false,
    }
  );
  
useEffect(() => {
  // inicializa o sincroniza el form
  setForm(name, {
    inputs: initialValues,
    errors: {},
    loading: false,
  });
}, [name]);

// 👇 cleanup SOLO al desmontar
useEffect(() => {
  return () => {
    resetForm(name);
  };
}, [name]);

  const validate = (): T | null => {
    resetErrors(name);

    const result = schema.safeParse(form.inputs);

    if (!result.success) {
      const fieldErrors = parseZodErrors(result.error);
      setErrors(name, fieldErrors);
      return null;
    }

    return result.data;
  };

  const handleSubmit = async (
    query: { url: string; method: TRequestMethod },
    onSuccess?: any
  ) => {
    const data = validate();
    if (!data) return;

    try {
      setLoading(name, true);

      const response = await request({
        url: query.url,
        method: query.method,
        data,
      });


      console.log(response)

      if (!response.success) {
        setErrors(name, response.errors);
        return;
      }

      onSuccess?.(response);
    } catch(error:any) {

        console.log(error)
      toast.error("Lo siento, error del servidor");
    } finally {
      setLoading(name, false);
    }
  };

  const setFieldValue = (key: string, value: any) => {
    setValue(name, key, value);
  };

  return {
    values: form.inputs as T,
    errors: form.errors,
    loading: form.loading,
    setValue: setFieldValue,
    handleSubmit,
  };
}
