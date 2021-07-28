export default function SizeOptim({ sizeOptim }) {
  const { defaultResponseLenght, textResponseLenght, percentage } = sizeOptim;
  const saved = defaultResponseLenght - textResponseLenght;
  let optimBytes = percentage >= 0 ? unit(saved) : '-' + unit(-saved);

  return (
    <span
      className="font__feedback"
      title={percentage > 0 ?
        'Optimized from the original file.' :
        'Worst than the original file.'}
    >
      {optimBytes}
      {percentage > 0 &&
        <span className="secondary">
          &nbsp;|&nbsp;{percentage}%
        </span>}
    </span>
  );
}

function unit(value) {
  if (value > 999999) return (value * 0.000001).toFixed(0) + 'MB';
  else if (value > 999) return (value * 0.001).toFixed(0) + 'KB';
  else return value + 'B';
}
