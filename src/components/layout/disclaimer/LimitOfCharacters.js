import { useSelector } from "react-redux";
import getSortedSet from "../../../js/getSortedSet";
import Disclaimer from "./Disclaimer";

export default function LimitOfCharacters() {
  const { charSubsets, customChars } = useSelector(state => state);
  const count = getSortedSet(customChars.concat(charSubsets.join(''))).length;

  return (
    <Disclaimer
      description="Google Fonts serves the default CSS when requesting 800+ unique characters, which includes all the available characters (not just the ones you need)."
      id="more-than-800-chars"
      title={`Characters ${count}/800`}
      warn={count > 800}
    />
  );
}

/**
 * By default, Google Fonts returns each subset headed with its respective name
 * as a comment (e.g.: \/* latin *\/).
 * 
 * If it's a specific CSS response from a request that contains the `text`
 * parameter, it shouldn't include any comments.
 * 
 * The `text` parameter can be "ignored", depending upon how many characters do
 * we pass (no docs found, but the limit seems to be 800), in such a case we get
 * the default @font-face instead of a specific one.
 */
