function getUrlsByFamily(url) {
  return url.match(/family=[\dA-Za-z+,:;@]+&/g)?.map(family =>
    'https://fonts.googleapis.com/css2?' + family + 'display=swap'
  );
}

export default getUrlsByFamily;
