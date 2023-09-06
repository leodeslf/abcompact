import { FormEvent, useRef, useState } from "react";
import { getGoogleFontsUrl } from "../../ts/googleFontsApi";
import { requestOptimizedFonts } from "../../ts/googleFontsOptimization";
import CustomCharacters from "./CustomCharacters";
import GoogleFontsCode from "./GoogleFontsCode";
import predefinedCharacterSubsets from
  '../../json/predefinedCharacterSubsets.json';
import PredefinedCharacterSubsets from "./PredefinedCharacterSubsets";
import SubmitButton from "./SubmitButton";

export default function Form() {
  const googleFontsCodeRef = useRef<HTMLInputElement>(null);
  const customCharactersRef = useRef<HTMLTextAreaElement>(null);
  const predefinedCharacterSubsetsRef = useRef<HTMLFieldSetElement>(null);
  const [
    amountOfSelectedSubsets,
    setAmountOfSelectedSubsets
  ] = useState(0);

  async function onSubmitEventHandler(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const inputCharacters = (
      customCharactersRef.current as HTMLTextAreaElement
    ).value;
    const inputUnicodeRanges = [...(
      predefinedCharacterSubsetsRef.current as HTMLFieldSetElement
    ).getElementsByTagName('input')]
      .filter(({ checked }) => checked)
      .map(({ value }) =>
        predefinedCharacterSubsets
          .filter(({ id }) => id === Number(value))[0]
          .unicodeRanges
      )
      .flat();
    await requestOptimizedFonts(
      getGoogleFontsUrl((googleFontsCodeRef.current as HTMLInputElement).value),
      inputCharacters,
      inputUnicodeRanges
    );
  };

  return (
    <form
      id="form"
      onSubmit={onSubmitEventHandler}
    >
      <GoogleFontsCode ref={googleFontsCodeRef} />
      <div className="characters__container">
        <CustomCharacters
          ref={customCharactersRef}
          isRequired={amountOfSelectedSubsets === 0}
        />
        <PredefinedCharacterSubsets
          ref={predefinedCharacterSubsetsRef}
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
