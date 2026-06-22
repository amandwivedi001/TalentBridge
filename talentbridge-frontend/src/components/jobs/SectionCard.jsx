function SectionCard({ children }) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
      style={{
        padding: "24px",
      }}
    >
      {children}
    </div>
  );
}

export default SectionCard;