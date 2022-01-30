import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import getSortedSet from "../../js/getSortedSet";
import getFontFaceList from "../../js/getFontFaceList";
import { set as setLastRequest } from "../../stores/lastRequestSlice";
import { add as addFontFaceToList, clear as clearFontFaceList } from "../../stores/fontFaceListSlice";
import { clear as clearModalList } from "../../stores/charCoverageModalContentSlice";
import Url from "./Url";
import Disclaimers from "./disclaimer/Disclaimers";
import Chars from "./chars/Chars";

export default function Input() {
  const dispatch = useDispatch();
  const { url, customChars, charSubsets } = useSelector(state => state);
  const [loading, setLoading] = useState(false);
  const chars = getSortedSet(customChars.concat(charSubsets.join('')));
  const validInput = url?.length && chars.length && chars.length <= 800;

  async function submit(e) {
    e.preventDefault();
    if (validInput) {
      setLoading(true);
      dispatch(clearModalList());
      dispatch(clearFontFaceList());
      dispatch(setLastRequest({ url, chars }));
      const fontFaceList = getFontFaceList(url, chars);
      for await (const fontFace of fontFaceList) {
        dispatch(addFontFaceToList(fontFace));
      }
      setLoading(false);
    }
  }

  return (
    <form
      id="form"
      className="input"
      onSubmit={submit}
    >
      <Url />
      <Chars />
      <Disclaimers />
      <button
        className={`submit-button ${loading ? 'loading' : ''}`}
        type="submit"
        form="form"
        title={!validInput ?
          'Please set a valid URL and select at least one character.' : ''}
        disabled={!validInput}
      >
        Get @font-face
      </button>
    </form>
  );
}
