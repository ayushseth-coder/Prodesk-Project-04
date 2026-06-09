function CoverLetterForm({ candidateName, jobRole, company, skills, onFieldChange }) {
  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="candidateName" className="block text-sm font-medium text-slate-300">
          Candidate Name
        </label>
        <input
          id="candidateName"
          type="text"
          value={candidateName}
          onChange={(event) => onFieldChange("candidateName", event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          placeholder="Jane Doe"
        />
      </div>

      <div>
        <label htmlFor="jobRole" className="block text-sm font-medium text-slate-300">
          Job Role
        </label>
        <input
          id="jobRole"
          type="text"
          value={jobRole}
          onChange={(event) => onFieldChange("jobRole", event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          placeholder="Senior Product Manager"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-slate-300">
          Target Company
        </label>
        <input
          id="company"
          type="text"
          value={company}
          onChange={(event) => onFieldChange("company", event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          placeholder="Acme Technologies"
        />
      </div>

      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-slate-300">
          Key Skills
        </label>
        <textarea
          id="skills"
          rows="5"
          value={skills}
          onChange={(event) => onFieldChange("skills", event.target.value)}
          className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          placeholder="Leadership, user research, product strategy, cross-functional collaboration"
        />
      </div>
    </div>
  );
}

export default CoverLetterForm;
