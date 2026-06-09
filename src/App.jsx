import { useState } from "react";
import CoverLetterForm from "./components/CoverLetterForm";
import OutputDisplay from "./components/OutputDisplay";
import ResumeUpload from "./components/ResumeUpload";
import LoadingState from "./components/LoadingState";
import { generateTemplate } from "./utils/templateGenerator";
import { generateCoverLetter } from "./utils/geminiAPI";

function App() {
  const [candidateName, setCandidateName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [templateMode, setTemplateMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const handleGenerate = async (useAI = false) => {
    setError("");
    setCopied(false);

    if (!candidateName || !jobRole || !company || !skills) {
      setError("Please complete all form fields before generating your cover letter.");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      if (!useAI) {
        setTemplateMode(true);
        const template = generateTemplate({
          candidateName,
          jobRole,
          company,
          skills,
          resumeText,
        });
        setOutput(template);
      } else {
        if (!apiKey) {
          throw new Error("Missing Gemini API key. Please add it to your .env file.");
        }
        setTemplateMode(false);
        const generated = await generateCoverLetter({
          candidateName,
          jobRole,
          company,
          skills,
          resumeText,
        });
        setOutput(generated);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleResumeExtract = (text) => {
    setResumeText(text);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_20%),radial-gradient(circle_at_30%_20%,_rgba(168,85,247,0.14),_transparent_18%)] text-slate-100">
      <div className="relative isolate px-4 py-10 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 -top-20 -z-10 flex justify-center overflow-hidden blur-3xl">
          <div className="aspect-[1155/678] w-[72rem] bg-gradient-to-r from-sky-500/20 via-violet-500/15 to-cyan-400/10 opacity-70" />
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="mb-10 rounded-3xl border border-slate-800 bg-slate-950/85 p-8 shadow-glow backdrop-blur-xl sm:p-10">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full bg-slate-800 px-3 py-1 text-sm font-medium text-cyan-300 ring-1 ring-cyan-500/20">
                AI Cover Letter SaaS
              </span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl" style={{ fontFamily: "Sora, sans-serif" }}>
                Generate personalized cover letters in seconds.
              </h1>
              <p className="mt-4 text-base leading-8 text-slate-300" style={{ fontFamily: "DM Sans, sans-serif" }}>
                Build a premium application that generates professional cover letters using Google Gemini AI and resume parsing. Upload a PDF resume for the most tailored results.
              </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
                <CoverLetterForm
                  candidateName={candidateName}
                  jobRole={jobRole}
                  company={company}
                  skills={skills}
                  onFieldChange={(field, value) => {
                    switch (field) {
                      case "candidateName":
                        setCandidateName(value);
                        break;
                      case "jobRole":
                        setJobRole(value);
                        break;
                      case "company":
                        setCompany(value);
                        break;
                      case "skills":
                        setSkills(value);
                        break;
                      default:
                        break;
                    }
                  }}
                />
                <ResumeUpload onTextExtracted={handleResumeExtract} disabled={loading} />
                {resumeText && (
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-100">
                    Resume text loaded and ready for personalization.
                  </div>
                )}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => handleGenerate(true)}
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Generating..." : "Generate with AI"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenerate(false)}
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-800 px-5 py-3 text-base font-semibold text-cyan-400 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 border border-cyan-500/30"
                  >
                    {loading ? "Generating..." : "Generate Template"}
                  </button>
                </div>
                {error && (
                  <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                    {error}
                  </p>
                )}
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white" style={{ fontFamily: "Sora, sans-serif" }}>
                      Cover Letter Preview
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400" style={{ fontFamily: "DM Sans, sans-serif" }}>
                      Review your output here and copy it for your job application.
                    </p>
                  </div>
                  {apiKey ? (
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-300">
                      Gemini Enabled
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-300 ring-1 ring-amber-500/20">
                      Template Mode
                    </span>
                  )}
                </div>
                <div className="mt-6 min-h-[240px]">
                  {loading ? (
                    <div className="flex h-full items-center justify-center rounded-3xl border border-slate-800 bg-slate-950/80">
                      <LoadingState label="Generating..." />
                    </div>
                  ) : (
                    <OutputDisplay
                      output={output}
                      templateMode={templateMode || !apiKey}
                      onCopy={handleCopy}
                      copied={copied}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;