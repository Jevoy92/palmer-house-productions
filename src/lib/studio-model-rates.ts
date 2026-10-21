// Conservative post-promotion rates. Only explicitly priced routes are enabled.
export const studioModelRates: Record<
  string,
  { input: number; output: number; image1k?: number; image2k?: number }
> = {
  "openai/gpt-6-luna": { input: 0.1, output: 0.5 },
  "openai/gpt-6-sol": { input: 2, output: 10 },
  "google/gemini-3.8-flash": { input: 1.5, output: 7.5 },
  "google/gemini-3.1-flash-image": { input: 0.5, output: 3, image1k: 0.067, image2k: 0.101 },
};
