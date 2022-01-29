export default function Disclaimer({ description, id, title, warn }) {
  return (
    <details
      className={`disclaimer ${warn ? 'warn' : ''}`}
      {...{ id }}
    >
      <summary>
        {title}
      </summary>
      <p>
        {description}
      </p>
    </details>
  );
}
