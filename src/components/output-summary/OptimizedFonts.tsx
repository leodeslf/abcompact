import { memo } from "react";
import { useAppSelector } from "../../stores/hooks";
import OptimizedFont from "./OptimizedFont";

const OptimizedFontMemo = memo(OptimizedFont);

export default function OptimizedFonts() {
  const { optimizedFonts } = useAppSelector(state => state);

  return (<>
    {optimizedFonts.map(optimizedFont =>
      <OptimizedFontMemo
        key={optimizedFont.id}
        {...optimizedFont}
      />)}
  </>);
}
