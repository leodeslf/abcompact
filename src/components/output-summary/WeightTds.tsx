type WeightTdsProps = {
  value: number,
  unit: string
};

export default function WeightTds({ value, unit }: WeightTdsProps) {
  return (<>
    <td className="data-td">
      {value.toFixed(1)}
    </td>
    <td className="unit-td">
      &nbsp;{unit}
    </td>
  </>);
}
