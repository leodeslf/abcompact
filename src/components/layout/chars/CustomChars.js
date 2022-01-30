import { useDispatch } from "react-redux";
import { useState } from "react";
import { set } from '../../../stores/customCharsSlice';

export default function CustomChars() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  function handleChange({ target }) {
    dispatch(set(target.value));
    setValue(target.value);
  }

  return (
    <textarea
      className="custom-chars"
      value={value}
      onChange={handleChange}
      placeholder="Type the ones you need (case sensitive)..."
    />
  );
}
