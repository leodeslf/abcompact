import { useDispatch } from "react-redux";
import { useState } from "react";
import getCharsFromUnicodeRanges from '../../../js/getCharsFromUnicodeRanges';
import {
  add as addCharSubset,
  remove as removeCharSubset
} from "../../../stores/charSubsetsSlice";

export default function CharSubset({ name, data, id, range }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const value = data || getCharsFromUnicodeRanges([
    range.map(bound => parseInt('0x' + bound, 16))
  ]);

  function handleChange({ target }) {
    if (target.checked) dispatch(addCharSubset(value));
    else dispatch(removeCharSubset(value));
    setChecked(target.checked);
  }

  return (
    <label
      className={`char-subset ${checked ? 'selected' : ''}`}
      htmlFor={id}
      title={name}
    >
      {data || name.replace(/ /g, '-')}
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
      />
    </label>
  );
}
