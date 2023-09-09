import { FormEvent, useRef, useState } from "react";
import { getGoogleFontsUrl } from "../../ts/googleFontsApi";
import { requestOptimizedFonts } from "../../ts/googleFontsOptimization";
import CustomChars from "./CustomChars";
import GoogleFontsCode from "./GoogleFontsCode";
import predefinedCharSubsets from '../../json/predefinedCharSubsets.json';
import PredefinedCharSubsets from "./PredefinedCharSubsets";
import SubmitButton from "./SubmitButton";

export default function Form() {
  const googleFontsCodeRef = useRef<HTMLInputElement>(null);
  const customCharsRef = useRef<HTMLTextAreaElement>(null);
  const predefinedCharSubsetsRef = useRef<HTMLFieldSetElement>(null);
  const [
    amountOfSelectedSubsets,
    setAmountOfSelectedSubsets
  ] = useState(0);

  async function onSubmitEventHandler(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const inputChars = (
      customCharsRef.current as HTMLTextAreaElement
    ).value;
    const inputUnicodeRanges = [...(
      predefinedCharSubsetsRef.current as HTMLFieldSetElement
    ).getElementsByTagName('input')]
      .filter(({ checked }) => checked)
      .map(({ value }) =>
        predefinedCharSubsets
          .filter(({ id }) => id === Number(value))[0]
          .unicodeRanges
      ).flat();
    await requestOptimizedFonts(
      getGoogleFontsUrl((googleFontsCodeRef.current as HTMLInputElement).value),
      inputChars,
      inputUnicodeRanges
    );
  };

  return (
    <form
      id="form"
      onSubmit={onSubmitEventHandler}
    >
      <GoogleFontsCode ref={googleFontsCodeRef} />
      <div className="chars__container">
        <CustomChars
          ref={customCharsRef}
          isRequired={amountOfSelectedSubsets === 0}
        />
        <PredefinedCharSubsets
          ref={predefinedCharSubsetsRef}
          {...{
            amountOfSelectedSubsets,
            setAmountOfSelectedSubsets
          }}
        />
      </div>
      <SubmitButton />
    </form>
  );
}
