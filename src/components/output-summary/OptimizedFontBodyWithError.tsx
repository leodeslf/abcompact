import DefaultVsOptimizedTds from "./DefaultVsOptimizedTds";

export default function OptimizedFontBodyWithError({
  errorMessage,
  family
}: OptimizedFontWithError) {
  return (
    <tr>
      <td colSpan={2}>
        {family}<span role="alert" className="error">
          Error, {errorMessage}
        </span>
      </td>
      <DefaultVsOptimizedTds
        defaultWeight={0}
        optimizedWeight={0}
      />
    </tr>
  );
}
