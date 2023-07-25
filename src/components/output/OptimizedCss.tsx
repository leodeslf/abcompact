import { useAppSelector } from "../../stores/hooks";

export default function OptimizedCss() {
  const {
    optimizedCss,
    requestStatus: {
      isFailed,
      isLoading
    }
  } = useAppSelector(state => state);

  return (<>
    <div role="heading">
      <label htmlFor="optimized-css">
        Optimized CSS
      </label>
      <button
        onClick={() => navigator.clipboard.writeText(optimizedCss)}
        disabled={isLoading || isFailed}
        title="Click to copy your optimized CSS to the clipboard."
      >
        Copy
      </button>
    </div>
    <textarea
      id="optimized-css"
      placeholder={isLoading ? 'Loading...' :
        isFailed ? 'No optimized CSS to show...' : undefined}
      readOnly
      rows={10}
      value={optimizedCss}
    />
  </>);
}
