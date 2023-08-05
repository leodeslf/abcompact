import { useAppSelector } from "../../stores/hooks";
import OptimizedFont from "./OptimizedFont";

export default function OptimizedFonts() {
  const { optimizedFonts } = useAppSelector(state => state);

  return (<>
    {optimizedFonts.map(optimizedFont =>
      <OptimizedFont
        key={optimizedFont.id}
        {...optimizedFont}
      />)}
  </>);
}
