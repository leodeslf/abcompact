const preconnectLink = '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';

export default function PreconnectLink() {
  return (<>
    <div role="heading">
      <label htmlFor="preconnect-link">
        Preconnect Link
      </label>
      <button
        onClick={() => navigator.clipboard.writeText(preconnectLink)}
        title="Click to copy the preconnect link to the clipboard."
      >
        Copy
      </button>
    </div>
    <input
      id="preconnect-link"
      readOnly
      type="text"
      value={preconnectLink}
    />
  </>);
}
