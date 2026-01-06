import React,{ useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import Label from "./Label";
import { Calendar as CalenderIcon } from "lucide-react";
import Input from "./input/InputField";
//import Hook = flatpickr.Options.Hook;
//import DateOption = flatpickr.Options.DateOption;

/* type PropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: Hook | Hook[];
  defaultDate?: DateOption;
  label?: string;
  placeholder?: string;
}; */

export default function DatePicker({
  id,
  mode,
  onChange,
  label,
  defaultDate,
  placeholder,
  }) {        
  useEffect(() => {
    const flatPickr = flatpickr(`#${id}`, {
      mode: mode || "single",
     // static: true,
      monthSelectorType: "static",
      dateFormat: "Y-m-d",
      defaultDate,
      onChange,
        appendTo: document.body, // 👈 montado fuera del div con overflow

    });

    return () => {
      if (!Array.isArray(flatPickr)) {
        flatPickr.destroy();
      }
    };
  }, [mode, onChange, id, defaultDate]);

  return (
    <div>
     {/*  {label && <Label htmlFor={id}>{label}</Label>} */}

      <div className="relative">

        <Label>{label}</Label>
                    <div className="relative">
                      <Input
                      id={id}
                        placeholder={placeholder}
                        
                        className="pl-[62px]"
                      />
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                        <CalenderIcon className="size-6" />
                      </span>
                    </div>
       
      </div>
    </div>
  );
}
