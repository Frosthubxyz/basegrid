export function Button({ 
  children, 
  onClick, 
  variant = "primary",
  className = "",
  disabled = false
}: { 
  children: React.ReactNode; 
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  disabled?: boolean;
}) {
  const baseClasses = "px-6 py-3 rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40",
    secondary: "bg-zinc-800 hover:bg-zinc-700 text-white",
    outline: "bg-transparent border border-zinc-700 hover:border-zinc-600 text-zinc-300 hover:text-white"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
