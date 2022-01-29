import { useState } from "react";
import { useDispatch } from "react-redux";
import { set } from '../../../stores/customCharsSlice';

export default function CustomChars() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

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
