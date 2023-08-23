import { useAppSelector } from "../../stores/hooks";

export default function FormSubmitButton() {
  const {
    requestStatus: {
      currentProgress,
      isLoading,
      progressPhases
    }
  } = useAppSelector(state => state);
  const loadingText = `Loading... (${currentProgress}/${progressPhases})`;

  return (
    <div className="submit-button__container">
      <button
        className={isLoading ? 'submit-button--loading' : ''}
        disabled={isLoading}
        form="form"
        title={isLoading ? loadingText : 'Click to get your optimized CSS.'}
      >
        Optimize
      </button>
      {(isLoading && progressPhases > 1) && <span
        className="request-progress"
        role="status"
      >
        {loadingText}
      </span>}
    </div>
  );
}
