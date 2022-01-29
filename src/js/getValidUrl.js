function getValidUrl(inputUrl) {
  return inputUrl.match(
    /https:\/\/fonts.googleapis.com\/.+\?family=.+&display=swap/
  )?.['0'];
}

export default getValidUrl;
