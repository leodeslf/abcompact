function getCharsFromUnicodeRanges(ranges) {
  let chars = '';

  for (let range of ranges) {
    const [first, last] = [range[0], range[1]];
    for (let i = first; i <= last; i++) {
      chars += String.fromCharCode(i);
    }
  }

  return chars;
}

export default getCharsFromUnicodeRanges;
