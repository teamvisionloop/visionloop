const Logo = ({ className = "h-8" }: { className?: string }) => {
  return (
    <div className={`flex items-center font-display font-bold tracking-tight ${className}`}>
      <span className="text-foreground">VISIONL</span>
      <svg 
        viewBox="0 0 40 20" 
        className="h-[0.6em] w-auto mx-0.5"
        fill="currentColor"
      >
        <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10c3.517 0 6.612-1.82 8.392-4.566C20.172 18.18 23.267 20 26.784 20c5.523 0 10-4.477 10-10S32.307 0 26.784 0c-3.517 0-6.612 1.82-8.392 4.566C16.612 1.82 13.517 0 10 0zm0 4c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6zm16.784 0c3.314 0 6 2.686 6 6s-2.686 6-6 6c-2.21 0-4.144-1.196-5.184-2.978a10.043 10.043 0 000-6.044C22.64 5.196 24.574 4 26.784 4z" />
      </svg>
      <span className="text-foreground">P</span>
    </div>
  );
};

export default Logo;
