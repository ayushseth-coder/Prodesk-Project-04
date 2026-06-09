export function generateTemplate({ candidateName, jobRole, company, skills, resumeText }) {
  const resumeSection = resumeText
    ? `My resume highlights relevant achievements and experience, including ${resumeText
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 220)}.`
    : `I am confident that my combination of experience, communication, and strategic thinking would make me a strong fit for this role.`;

  return `Dear Hiring Manager,

My name is ${candidateName}, and I am excited to apply for the ${jobRole} position at ${company}. With a strong foundation in ${skills}, I bring a proven ability to deliver thoughtful solutions, collaborate with cross-functional partners, and maintain a disciplined approach to high-impact work.

${resumeSection}

I am especially drawn to ${company} because of its reputation for innovation, thoughtful customer focus, and a culture that values growth. I would welcome the opportunity to contribute to your team and help drive results in the ${jobRole} role.

Thank you for reviewing my application. I look forward to the possibility of speaking with you and sharing how my background can support your goals.

Sincerely,
${candidateName}`;
}
