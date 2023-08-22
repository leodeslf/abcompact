type EmptyTdProps = {
  colSpan?: number
};

export default function EmptyTd({ colSpan }: EmptyTdProps) {
  return (
    <td {...colSpan && { colSpan }}>
      &nbsp;
    </td>
  );
};
