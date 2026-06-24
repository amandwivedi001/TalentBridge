import clsx from "clsx";

function Card({
  children,
  className,
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        className
      )}
      style={{
        padding: "1.5rem",
      }}
    >
      {children}
    </div>
  );
}

export default Card;