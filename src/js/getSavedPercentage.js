function getSavedPercentage(specific, generic) {
  return +(100 - specific / generic * 100).toFixed(1);
}

export default getSavedPercentage;
