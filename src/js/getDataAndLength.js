import axios from "axios";

const client = axios.create();

async function getDataAndLength(url) {
  return await client
    .get(url)
    .then(({ data, headers }) => {
      const contentType = headers['content-type'];
      if (contentType.includes('css'))
        return {
          data,
          length: data.length
        };
      if (contentType.includes('woff2') || contentType.includes('html'))
        return {
          data: null,
          length: +headers['content-length']
        };
      return false;
    })
    .catch(() => {
      return false;
    });
}

export default getDataAndLength;
