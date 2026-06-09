const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generate";

const systemPrompt = `You are a professional assistant generating a polished cover letter. The final text should read as a cohesive business letter with natural transitions and no markdown formatting. Keep the tone confident, concise, and tailored to the candidate.`;

function buildPrompt({ candidateName, jobRole, company, skills, resumeText }) {
  return `Candidate Name: ${candidateName}
Job Role: ${jobRole}
Company: ${company}
Key Skills: ${skills}
${resumeText ? `Resume Summary: ${resumeText}
` : ""}
Using the information above, write a compelling cover letter addressed to the hiring manager. Focus on alignment with the target role and company, tie the skills to business impact, and close with a strong professional signature.`;
}

export async function generateCoverLetter({ candidateName, jobRole, company, skills, resumeText }) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing Gemini API key.");
  }

  const payload = {
    prompt: {
      text: `${systemPrompt}\n\n${buildPrompt({ candidateName, jobRole, company, skills, resumeText })}`,
    },
    temperature: 0.25,
    maxOutputTokens: 512,
  };

  const url = `${GEMINI_ENDPOINT}?key=${encodeURIComponent(apiKey)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const errorMessage = errorBody?.error?.message || response.statusText || "Unknown API error.";
    const statusCode = response.status;

    if (statusCode === 401) {
      throw new Error("Invalid Gemini API key. Please check your credentials.");
    }

    if (statusCode === 404 || statusCode === 400) {
      throw new Error(`Gemini API not available. Falling back to template mode. Details: ${errorMessage}`);
    }

    throw new Error(`Gemini API error: ${errorMessage}`);
  }

  const data = await response.json();
  const candidateText =
    data?.candidates?.[0]?.content?.[0]?.text ||
    data?.output?.[0]?.content?.text ||
    data?.response ||
    data?.text ||
    "";

  if (!candidateText) {
    throw new Error("Gemini returned an unexpected response format.");
  }

  return candidateText.trim();
}
