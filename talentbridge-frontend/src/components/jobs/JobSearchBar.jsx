import { Search } from "lucide-react";

function JobSearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-2xl">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search size={20} className="text-slate-400" />
      </div>
      <input
        type="text"
        placeholder="Search jobs, companies, roles, or skills..."
        value={value}
        onChange={onChange}
        className="
          h-14
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          pl-11
          pr-4
          text-sm
          text-slate-900
          shadow-sm
          outline-none
          transition-all
          placeholder:text-slate-400
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-500/10
        "
        style={{paddingLeft: "44px", paddingRight: "16px"}}
      />
    </div>
  );
}

export default JobSearchBar;