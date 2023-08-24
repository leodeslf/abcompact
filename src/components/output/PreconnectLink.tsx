import Heading from "../common/Heading";

const preconnectLink = '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';

export default function PreconnectLink() {
  return (<>
    <Heading>
      <label htmlFor="preconnect-link">
        Preconnect Link
      </label>
      <button
        onClick={() => navigator.clipboard.writeText(preconnectLink)}
        title="Click to copy the preconnect link to the clipboard."
      >
        Copy
      </button>
    </Heading>
    <input
      id="preconnect-link"
      readOnly
      type="text"
      value={preconnectLink}
    />
  </>);
}
