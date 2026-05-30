import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_API_KEY,
});

export async function fixCode(code, language) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
      Fix this ${language} code.
      Return only corrected code.

      ${code}
    `,
  });

  return response.text;
}

export async function reviewCode(code, language) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
      Review this ${language} code.

      Give:
      1. Code Quality
      2. Mistakes
      3. Improvements
      4. Best Practices

      ${code}
    `,
  });

  return response.text;
}

export async function executeCode(code, language) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: `
You are a real ${language} compiler and runtime.

Execute the following code mentally.

Rules:
- If code is correct, return ONLY the exact output.
- If code has syntax/runtime errors, return ONLY realistic compiler/runtime errors.
- Do not explain anything.
- Do not use markdown.
- Do not use code blocks.
- Return plain text only.
- Make errors look like real programming errors.

Code:
${code}
      `,
    });

    return response.text;
  } catch (error) {
    console.log(error);

    return "Failed to execute code";
  }
}