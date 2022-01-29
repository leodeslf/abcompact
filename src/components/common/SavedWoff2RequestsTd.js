export default function SavedWoff2RequestsTd({
  from, to, saved, savedPercentage
}) {
  return (
    <td
      className={`requests ${saved ? 'good' : 'regular'}`}
      title={`From ${from} to ${to}.`}
    >
      {`${saved} (${savedPercentage}%)`}
    </td >
  );
}
