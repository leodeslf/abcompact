import { useAppSelector } from "../../stores/hooks";
import Heading from "../common/Heading";

export default function OptimizedCss() {
  const { optimizedCss } = useAppSelector(state => state);

  return (<>
    <Heading>
      <label htmlFor="optimized-css">
        Optimized CSS
      </label>
      <button
        onClick={() => navigator.clipboard.writeText(optimizedCss)}
        title="Click to copy your optimized CSS to the clipboard."
      >
        Copy
      </button>
    </Heading>
    <textarea
      id="optimized-css"
      readOnly
      rows={10}
      value={optimizedCss}
    />
  </>);
}
