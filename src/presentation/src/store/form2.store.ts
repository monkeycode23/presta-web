import { create } from "zustand";
import { request, type TRequestMethod } from "../services/api/request";
import { parseZodErrors } from "../errors/utils";
import { toast } from "sonner";

interface SingleFormState {
  inputs: Record<string, any>;
  errors: Record<string, any>;
  loading: boolean;
}

interface FormStore {
  forms: Record<string, SingleFormState>;

  setForm: (name: string, data: SingleFormState) => void;
  setValue: (name: string, key: string, value: any) => void;
  setErrors: (name: string, errors: any) => void;
  resetErrors: (name: string) => void;
  resetForm: (name: string) => void;
  setLoading: (name: string, value: boolean) => void;

  submit: (
    name: string,
    query: { url: string; method: TRequestMethod },
    schema?: any,
    onSuccess?: any
  ) => Promise<void>;
}

const useFormStore = create<FormStore>((set, get) => ({
  forms: {},

  setForm: (name, data) =>
    set((state) => ({
      forms: {
        ...state.forms,
        [name]: data,
      },
    })),

  setValue: (name, key, value) =>
    set((state) => ({
      forms: {
        ...state.forms,
        [name]: {
          ...state.forms[name],
          inputs: {
            ...state.forms[name]?.inputs,
            [key]: value,
          },
        },
      },
    })),

  setErrors: (name, errors) =>
    set((state) => ({
      forms: {
        ...state.forms,
        [name]: {
          ...state.forms[name],
          errors: errors,
        },
      },
    })),

  resetErrors: (name) =>
    set((state) => ({
      forms: {
        ...state.forms,
        [name]: {
          ...state.forms[name],
          errors: {},
        },
      },
    })),

  setLoading: (name, value) =>
    set((state) => ({
      forms: {
        ...state.forms,
        [name]: {
          ...state.forms[name],
          loading: value,
        },
      },
    })),

  resetForm: (name) =>
    set((state) => {
      const { [name]: _, ...rest } = state.forms;
      return { forms: rest };
    }),

  submit: async (name, { url, method }, schema, onSuccess) => {
    const form = get().forms[name];
    if (!form) return;

    set((state) => ({
      forms: {
        ...state.forms,
        [name]: { ...form, loading: true, errors: {} },
      },
    }));

    try {
      if (schema) {
        const parsed = schema.safeParse(form.inputs);
        if (!parsed.success) {
          const errs = parseZodErrors(parsed.error);
          get().setErrors(name, errs);
          get().setLoading(name, false);
          return;
        }
      }

      const response = await request({
        url,
        method,
        data: form.inputs,
      });

      if (!response.success) {
        get().setErrors(name, response.errors);
        throw new Error("Server error");
      }

      if (onSuccess) onSuccess(response);
    } catch (err) {
      toast.error("Algo salió mal");
    } finally {
      get().setLoading(name, false);
    }
  },
}));

export default useFormStore;
