import { useAppSelector } from "../../stores/hooks";
import DefaultVsOptimizedTds from './DefaultVsOptimizedTds';

export default function FilesWeight() {
  const {
    outputSummary: {
      css,
      woff2
    }
  } = useAppSelector(state => state);

  return (<>
    <tr>
      <th colSpan={2}>
        CSS
      </th>
      <DefaultVsOptimizedTds
        defaultWeight={css.default}
        optimizedWeight={css.optimized}
      />
    </tr>
    <tr>
      <th colSpan={2}>
        WOFF2
      </th>
      <DefaultVsOptimizedTds
        defaultWeight={woff2.default}
        optimizedWeight={woff2.optimized}
      />
    </tr>
  </>);
}
