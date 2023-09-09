import { familyPrefix, usePreviewPagination } from "../../ts/gui";
import { memo, useMemo } from "react";
import { useAppSelector } from "../../stores/hooks";
import CharacterGalleryLayer from "./CharacterGalleryLayer";
import CharacterUnits from "./CharacterUnits";

const CharacterUnitsMemo = memo(CharacterUnits);

type CharacterGalleryProps = {
  fontIndex: number,
  styleIndex: number,
  pageIndex: number
};

export default function CharacterGallery({
  fontIndex,
  styleIndex,
  pageIndex
}: CharacterGalleryProps) {
  const {
    optimizedFonts,
    requestMemo: {
      characterUnits
    }
  } = useAppSelector(state => state);
  const {
    results: {
      characterCoverageBitmap,
      styles
    },
    family
  } = optimizedFonts[fontIndex] as OptimizedFontWithoutError;
  const { cssProperties } = styles[styleIndex];
  const [pageStart, pageEnd] = usePreviewPagination(pageIndex);
  const characterUnitsPage = useMemo(
    () => characterUnits.slice(pageStart, pageEnd),
    [pageIndex]
  );
  const characterCoverageBitmapPage = useMemo(
    () => characterCoverageBitmap.slice(pageStart, pageEnd),
    [characterCoverageBitmap, pageIndex]
  );

  return (
    <div className="character-gallery">
      <CharacterGalleryLayer style={{
        fontFamily: `"${familyPrefix}${family}", serif`,
        fontVariationSettings: cssProperties.fontVariationSettings, // *
        fontStyle: cssProperties.fontStyle, // Needs to be set >:(
      }}>
        <CharacterUnitsMemo
          bitToMatch={1}
          characterCoverageBitmap={characterCoverageBitmapPage}
          characterUnits={characterUnitsPage}
        />
      </CharacterGalleryLayer>
      <CharacterGalleryLayer>
        <CharacterUnitsMemo
          bitToMatch={0}
          characterCoverageBitmap={characterCoverageBitmapPage}
          characterUnits={characterUnitsPage}
        />
      </CharacterGalleryLayer>
    </div>
  );
};

/**
 * * 04/04/2023
 * `fontVariationSettings: "ital" 1` is supposed to override its counterpart
 *  heigh-level property `font-style` but is not working (it used to). For now,
 *  we need to use `font-style` to ensure the correct style is used.
 */
