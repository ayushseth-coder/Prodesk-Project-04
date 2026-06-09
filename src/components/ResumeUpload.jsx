import { useRef, useState } from "react";
import { extractTextFromPdf } from "../utils/pdfParser";

function ResumeUpload({ onTextExtracted, disabled }) {
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState("Drop a PDF resume here or click to upload.");
  const inputRef = useRef(null);

  const processFile = async (file) => {
    if (!file) {
      return;
    }

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setStatus("Please upload a valid PDF resume.");
      return;
    }

    setStatus("Extracting resume text...");

    try {
      const extractedText = await extractTextFromPdf(file);
      if (!extractedText) {
        setStatus("Unable to extract text from the PDF. Please try another file.");
        return;
      }

      onTextExtracted(extractedText);
      setStatus("Resume text successfully extracted.");
    } catch (error) {
      setStatus("Unable to read this PDF. Please upload a different resume.");
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    await processFile(file);
    event.target.value = null;
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    await processFile(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300">Resume Upload</label>
      <div
        onDragEnter={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragActive(false);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDrop={handleDrop}
        className={`mt-2 rounded-3xl border p-6 transition ${
          dragActive ? "border-cyan-400 bg-slate-900/90" : "border-slate-800 bg-slate-950/80"
        }`}
      >
        <div className="flex min-h-[160px] flex-col items-center justify-center gap-4 text-center">
          <div className="space-y-3">
            <p className="text-sm text-slate-300">Drag and drop a PDF resume here, or browse your files.</p>
            <p className="text-xs text-slate-500">Only .pdf files are accepted.</p>
          </div>
          <button
            type="button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            className="rounded-full bg-slate-800 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Upload PDF
          </button>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <p className="mt-3 text-sm text-slate-400">{status}</p>
    </div>
  );
}

export default ResumeUpload;
