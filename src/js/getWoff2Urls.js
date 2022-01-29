function getWoff2Urls(css) {
  return css.match(/https:\/\/fonts\.gstatic\.com.*((\.woff2)|(&v=v\d+))/g);
}

export default getWoff2Urls;
