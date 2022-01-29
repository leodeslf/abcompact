import { useDispatch } from "react-redux";
import { useState } from "react";
import { set } from "../../stores/urlSlice";
import getValidUrl from "../../js/getValidUrl";

export default function Url() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  function handleChange({ target }) {
    setValue(target.value);
    const newUrl = getValidUrl(target.value);
    if (newUrl) dispatch(set(newUrl));
  }

  return (
    <div className="url">
      <label htmlFor="font-url">
        Font URL
      </label>
      <input
        type="text"
        id="font-url"
        value={value}
        onChange={handleChange}
        required
        pattern=".*https://fonts.googleapis.com/.+family=.+&display=swap.*"
        placeholder="https://fonts.googleapis.com/..."
      />
    </div>
  );
}
