import { Loader2 } from "lucide-react";

function Button({
  children,
  loading = false,
  loadingText = "Loading...",
  className = "",
  ...props
}) {
  return (
    <button
      disabled={loading}
      className={`
        h-14
        w-full
        rounded-2xl
        bg-linear-to-r
        from-blue-600
        to-blue-700
        font-semibold
        text-white

        transition-all
        duration-200

        hover:scale-[1.01]
        hover:shadow-xl
        hover:shadow-blue-600/20

        disabled:cursor-not-allowed
        disabled:opacity-70

        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2
            size={18}
            className="animate-spin"
          />

          {loadingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;