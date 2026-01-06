import { create } from "zustand";
import { request,type TRequestMethod } from "../services/api/request";
import { ZodError } from "zod";
import { parseZodErrors } from "../errors/utils";
import { toast } from "sonner";


interface FormState {
  inputs: Record<string, any | any[]>;
  errors: any;
  name: string;

  loading: boolean;
  setFormFields: (fields: any) => void;
  /* setForm: (data:Partial<FormState>) => void; */
  setValue: (key: string, value: any) => void;
  setError: (key: string, value: string) => void;
  setLoading: (value: boolean) => void;
  resetForm: () => void;
  setErrors: (errors: any) => void;
   setForm: (inputs: any) => void;
  submitState: any;
  submit: (cb: any, schema?: any, onSubmit?: any) => Promise<void>;
  resetErrors: () => void;
}

const useFormStore = create<FormState>((set, get) => ({
  name: "default",
  inputs: {},
  errors: {},
  loading: false,
  submitState: {},

  setFormFields: (fields) => set({ inputs: fields }),


  submit: async ({ url, method }, schema, onSuccess) => {
    const state = get();
    set({ loading: true, errors: {} });

    try {
      if (schema) {
        const parsed = schema.safeParse(state.inputs);

        if (!parsed.success) {
          console.log("Errores de proyecto:", parsed.error);
          const errs = parseZodErrors(parsed.error);
          set({ errors: errs, loading: false });
          return;
        }
      }

      const response = await request({
        url,
        method,
        data: state.inputs,
      });

      if (!response.success) {
        set({ loading: false, errors: response.errors });
        throw new Error("errors");
      }

      if (onSuccess) onSuccess(response);
    } catch (error) {
      console.log(error);
      toast.error("Algo salió mal");
      set({ loading: false });
    }
  },

  resetForm: () =>
    set((state) => ({
      inputs: {},
      errors: {},
      name: "",
      loading: false,
    })),
  setErrors: (errors) =>
    set((state) => ({
      errors: { ...state.errors, ...errors },
    })),
    setForm: (data) =>set((state) => ( { ...state,
        name:data.name,
        inputs:data.inputs,
        errors:data.errors,
        loading:data.loading
       }
    )),
  resetErrors: () =>
    set((state) => ({
      errors: {},
    })),
  setValue: (key, value) => {

    console.log(get().inputs)
    console.log(`Setting form input ${key} to ${value}`);
    set((state) => ({
      inputs: { ...state.inputs, [key]: value },
    }));
  },
  setError: (key, value) =>
    set((state) => ({
      errors: { ...state.errors, [key]: value },
    })),
  setLoading: (value) =>
    set((state) => ({
      loading: value,
    })),
}));

export default useFormStore;
