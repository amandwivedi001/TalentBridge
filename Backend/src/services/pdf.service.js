import { PDFParse } from "pdf-parse";
import { ApiError } from "../utils/ApiError.js";

export const extractTextFromPdf = async (buffer) => {
  if (!buffer) {
    throw new ApiError(400, "PDF buffer is required");
  }

  const parser = new PDFParse({
    data: buffer,
  });

  const result = await parser.getText();

  await parser.destroy();

  return result.text;
};