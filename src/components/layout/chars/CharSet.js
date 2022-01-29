import CharSubset from "./CharSubset";

export default function CharSet({ sets, id }) {
  return (
    <div className="char-set">
      {sets.map(({ name, data, range }, i) =>
        <CharSubset
          key={i}
          {...{ name, data, id: `${id}-${i}`, range }}
        />
      )}
    </div>
  );
}
