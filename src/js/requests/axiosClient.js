import axios from 'axios';

const baseURL = 'https://fonts.googleapis.com/';
const baseLength = baseURL.length;
const config = {
  baseURL,
  method: 'get',
  responseType: 'text'
};

// Shape { id, defaultResponseLenght, textResponseLenght }[].
const sizeSet = [];

/**
 * There will be two requests per "font", both to the same URI, but with
 * different options. For each: use the actual URI from the URL as an ID,
 * and save the responses' lenght to be campared later.
 * @param {ProgressEvent} e 
 * @param {string} propName 
 * @returns 
 */
function saveSize(e, propName) {
  const { responseURL, response } = e.currentTarget;
  const id = responseURL.slice(baseLength, responseURL.indexOf('&display='));
  const resIndex = sizeSet.findIndex(res => res.id === id);

  if (resIndex < 0) {
    sizeSet.push({ id, [propName]: response.length });
    return;
  } // else
  sizeSet[resIndex][propName] = response.length;
}

const defaultClient = axios.create({
  onDownloadProgress: e => saveSize(e, 'defaultResponseLenght'),
  ...config
});

const textClient = axios.create({
  onDownloadProgress: e => saveSize(e, 'textResponseLenght'),
  ...config
});

export { baseLength, defaultClient, textClient, sizeSet };
