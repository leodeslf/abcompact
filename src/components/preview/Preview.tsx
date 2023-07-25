import { useState } from "react";
import { useAppSelector } from "../../stores/hooks";
import CharacterGallery from "./CharacterGallery";
import FontPicker from "./FontPicker";
import StylePicker from "./StylePicker";

export default function Preview() {
  const { optimizedFonts } = useAppSelector(state => state);
  // At this point it's guaranteed that there is at least one valid font.
  const firstValidOptimizedFontIndex = (
    optimizedFonts.find(font => font.errorMessage === undefined)
  )?.id as number;
  const [fontIndex, setFontIndex] = useState(firstValidOptimizedFontIndex);
  const [styleIndex, setStyleIndex] = useState(0);

  return (
    <div className="preview">
      <FontPicker {...{
        fontIndex,
        setFontIndex,
        setStyleIndex
      }} />
      <StylePicker {...{
        fontIndex,
        styleIndex,
        setStyleIndex
      }} />
      <CharacterGallery
        fontIndex={fontIndex}
        styleIndex={styleIndex}
      />
    </div>
  );
}
