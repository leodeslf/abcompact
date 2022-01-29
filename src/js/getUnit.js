const kilobyte = 1000;
const megabyte = 1000000;

function getUnit(bytes) {
  if (isNaN(bytes)) return bytes;

  const sign = bytes < 0 ? '-' : '';
  const absBytes = Math.abs(bytes);
  const digitsAndUnit = absBytes < kilobyte ?
    absBytes + ' B' : (absBytes >= kilobyte && absBytes < megabyte) ?
      +(absBytes / kilobyte).toFixed(1) + ' KB' : (absBytes >= megabyte) ?
        +(absBytes / megabyte).toFixed(1) + ' MB' : null;

  return sign + digitsAndUnit;
}

export default getUnit;
