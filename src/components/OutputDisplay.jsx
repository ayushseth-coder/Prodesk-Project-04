import ReactMarkdown from "react-markdown";

function OutputDisplay({ output, templateMode, onCopy, copied }) {
  if (!output) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 text-slate-500">
        Fill in the fields and click Generate to see your cover letter here.
      </div>
    );
  }

  const parsedOutput = output.trim().split(/\n\s*\n/).filter(Boolean).join("\n\n");

  return (
    <div className="space-y-5 rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white" style={{ fontFamily: "Sora, sans-serif" }}>
            Generated Cover Letter
          </h3>
          {templateMode && (
            <p className="mt-1 text-sm text-amber-300">
              Running in template mode because no Gemini API key is configured.
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          {copied ? "Copied!" : "Copy to Clipboard"}
        </button>
      </div>

      <div className="space-y-5 text-slate-100">
        <ReactMarkdown>{parsedOutput}</ReactMarkdown>
      </div>
    </div>
  );
}

export default OutputDisplay;
