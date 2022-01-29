export default function FontFaceErrorDescription({ description }) {
  return (
    <td
      colSpan={4}
      className='error-description'
      title="Optimization couldn't be done."
    >
      {description}
    </td>
  );
}
