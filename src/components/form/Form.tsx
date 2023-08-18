import { FormEvent } from "react";
import { getCharacterUnitsFromInputValue } from "../../ts/characters";
import { getGoogleFontsUrl } from "../../ts/googleFontsApi";
import { getGoogleFontsCodeInputValue } from "../../ts/gui";
import { requestOptimizedFonts } from "../../ts/googleFontsOptimization";
import CustomCharacters from "./CustomCharacters";
import GoogleFontsCode from "./GoogleFontsCode";
import PredefinedCharacterSubsets from "./PredefinedCharacterSubsets";
import SubmitButton from "./SubmitButton";

export default function Form() {
  async function onSubmitEventHandler(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    const { elements } = event.currentTarget;
    await requestOptimizedFonts(
      getGoogleFontsUrl(getGoogleFontsCodeInputValue(elements)),
      getCharacterUnitsFromInputValue(elements)
    );
  };

  return (
    <form
      autoComplete="on"
      className="form"
      id="form"
      onSubmit={onSubmitEventHandler}
    >
      <GoogleFontsCode />
      <div className="characters">
        <CustomCharacters />
        <PredefinedCharacterSubsets />
      </div>
      <SubmitButton />
    </form>
  );
}
