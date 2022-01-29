function getSortedSet(string) {
  return [...new Set(string.split('').sort())].join('');
}

export default getSortedSet;
