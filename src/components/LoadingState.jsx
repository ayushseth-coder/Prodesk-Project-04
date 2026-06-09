function LoadingState({ label = "Working" }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-900/90 px-5 py-4 text-sm text-slate-100">
      <span>{label}</span>
      <span className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-blink" style={{ animationDelay: "0s" }} />
        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-blink" style={{ animationDelay: "0.16s" }} />
        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-blink" style={{ animationDelay: "0.32s" }} />
      </span>
    </div>
  );
}

export default LoadingState;
