import { useReadableFileWeight } from '../../ts/gui';
import WeightTds from './WeightTds';
import EmptyTd from './EmptyTd';

type DefaultVsOptimizedTdsProps = {
  defaultWeight: number,
  optimizedWeight: number
};

export default function DefaultVsOptimizedTds({
  defaultWeight,
  optimizedWeight
}: DefaultVsOptimizedTdsProps) {
  const [
    defaultFileWeight,
    defaultWeightUnit
  ] = useReadableFileWeight(defaultWeight);
  const [
    optimizedFileWeight,
    optimizedWeightUnit
  ] = useReadableFileWeight(optimizedWeight);

  return defaultWeight > 0 ? (<>
    <WeightTds
      value={defaultFileWeight}
      unit={defaultWeightUnit}
    />
    <WeightTds
      value={optimizedFileWeight}
      unit={optimizedWeightUnit}
    />
  </>) : (<>
    <EmptyTd colSpan={2} />
    <EmptyTd colSpan={2} />
  </>);
};
