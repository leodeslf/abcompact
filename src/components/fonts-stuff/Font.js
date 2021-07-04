import CopyBtn from "./CopyBtn";
import Coverage from "./Coverage";
import NoData from "./NoData";

export default function Font(font) {
  const { css, fontName, ok } = font;

  return (
    <div
      className="font"
      role="listitem"
    >
      <span className={`font__name${!ok ? ' not-ok' : ''}`}>
        {fontName}
      </span>
      {ok && <>
        <Coverage {...font} />
        <CopyBtn data={css} />
      </>}
      {!ok && <NoData />}
    </div>
  );
}
