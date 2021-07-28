/**
 * @param {object} sizeData 
 * @returns The default response data, the response data using the text param,
 * and the percentage of text saved between them.
 */
export default function getSizeOptim(sizeData) {
  const { defaultResponseLenght, textResponseLenght } = sizeData;
  return {
    defaultResponseLenght,
    textResponseLenght,
    percentage: (
      100 - textResponseLenght / defaultResponseLenght * 100
    ).toFixed(0)
  };
}
