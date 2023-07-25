import { useAppSelector } from "../../stores/hooks";

export default function FormSubmitButton() {
  const {
    requestStatus: {
      currentProgress,
      isLoading,
      progressPhases
    }
  } = useAppSelector(state => state);

  return (
    <div className="submit-button__container">
      {(isLoading && progressPhases > 1) && <span
        className="request-progress"
        role="status"
      >
        {currentProgress + 1}/{progressPhases}
      </span>}
      <button
        className={`submit-button${isLoading ? ' submit-button--loading' : ''}`}
        disabled={isLoading}
        form="form"
        title={isLoading ? 'Loading...' : 'Click to get your optimized CSS.'}
      >
        Optimize
      </button>
    </div>
  );
}
