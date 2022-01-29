function getIncludedAndMissingChars(ranges, chars) {
  let included = '';
  let missing = '';

  chars.split('').forEach(char => {
    const codeCode = char.charCodeAt(0);

    for (let range of ranges) {
      const [first, last] = [range[0], range[1]];
      if (codeCode >= first && codeCode <= last) {
        included += char;
        break;
      }
    }

    if (!included.includes(char)) {
      missing += char;
    }
  });
  
  return { included, missing };
}

export default getIncludedAndMissingChars;
