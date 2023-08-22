type WeightTdsProps = {
  value: number,
  unit: string
};

export default function WeightTds({ value, unit }: WeightTdsProps) {
  return (<>
    <td>
      {value.toFixed(1)}
    </td>
    <td>
      &nbsp;{unit}
    </td>
  </>);
}
