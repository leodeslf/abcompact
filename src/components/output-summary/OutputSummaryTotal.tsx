import { useAppSelector } from "../../stores/hooks";
import DefaultVsOptimizedTds from "./DefaultVsOptimizedTds";

export default function OutputSummaryTotal() {
  const {
    outputSummary: {
      css,
      woff2
    }
  } = useAppSelector(state => state);

  return (
    <tr>
      <th colSpan={2}>
        Total
      </th>
      <DefaultVsOptimizedTds
        defaultWeight={css.default + woff2.default}
        optimizedWeight={css.optimized + woff2.optimized}
      />
    </tr>
  );
}
