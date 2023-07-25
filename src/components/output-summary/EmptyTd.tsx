type EmptyTdProps = {
  colSpan: number
};

export default function EmptyTd({ colSpan }: EmptyTdProps) {
  return (
    <td
      className="empty-td"
      colSpan={colSpan}
    >
      -
    </td>
  );
};
