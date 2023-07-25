import DefaultVsOptimizedTds from "./DefaultVsOptimizedTds";

export default function OptimizedFontBodyWithError({
  errorMessage,
  name
}: OptimizedFontWithError) {
  return (
    <tr>
      <td
        colSpan={2}
      >
        {name}<span
          role="alert"
          className="inline-status"
          aria-errormessage={errorMessage}
        >
          Error, {errorMessage}.
        </span>
      </td>
      <DefaultVsOptimizedTds
        defaultWeight={0}
        optimizedWeight={0}
      />
    </tr>
  );
}
