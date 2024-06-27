export const getFirstTwoSentences = (text) => {
  // Split the text into sentences using regex (handles common punctuation)
  const sentences = text.split(/\. |\? |\! /);

  // Join the first two sentences back together with a period and space
  const firstTwoSentences = sentences.slice(0, 2).join(". ") + ".";

  return firstTwoSentences;
};
