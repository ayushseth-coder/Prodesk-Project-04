import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.js?url";

GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function extractTextFromPdf(file) {
  if (!file) {
    return "";
  }

  const fileData = await file.arrayBuffer();
  const pdf = await getDocument({ data: fileData }).promise;
  let extractedText = "";

  for (let index = 1; index <= pdf.numPages; index += 1) {
    const page = await pdf.getPage(index);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    extractedText += `${pageText}\n\n`;
  }

  return extractedText.trim();
}
