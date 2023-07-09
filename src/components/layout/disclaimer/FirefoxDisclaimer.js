import { useSelector } from "react-redux";
import Disclaimer from "./Disclaimer";

export default function VariableFontFirefox() {
  const { url } = useSelector(state => state);
  const isFirefox = navigator.userAgent.includes('Firefox');
  const urlHasVariableFont = url.match(/[0-1],[1-9](\d[1-9]|[1-9]\d)/)?.length;
  if (!isFirefox || !urlHasVariableFont) return <></>;

  return (
    <Disclaimer
      description="Google Fonts doesn't serve variable fonts to Firefox due to a rendering issue. It will approximate any non-standard weight value to the closest standard one."
      id="variable-font-firefox"
      title="Requesting a Variable Font from Firefox"
      warn={true}
    />
  );
}
