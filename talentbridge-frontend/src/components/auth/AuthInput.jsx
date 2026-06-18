import { useState } from "react";
import {
  Eye,
  EyeOff,
} from "lucide-react";

function AuthInput({
  label,
  type = "text",
  placeholder,
  ...props
}) {
  const [showPassword, setShowPassword] =
    useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          className="
            h-14
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            px-4
            text-slate-900
            outline-none
            transition-all
            duration-200

            placeholder:text-slate-400

            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
          "
          {...props}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default AuthInput;