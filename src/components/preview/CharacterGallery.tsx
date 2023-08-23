import { useState } from "react";
import { useAppSelector } from "../../stores/hooks";
import CharacterGalleryLayer from "./CharacterGalleryLayer";
import CharacterUnits from "./CharacterUnits";
import { familyPrefix } from "../../ts/gui";

const columns = 15;
const rows = 24;
const pageLength = rows * columns;

type CharacterGalleryProps = {
  fontIndex: number,
  styleIndex: number
};

export default function CharacterGallery({
  fontIndex,
  styleIndex
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
  } = (optimizedFonts[fontIndex] as OptimizedFontWithoutError);
  const { cssProperties } = styles[styleIndex];
  const totalPages = Math.ceil(characterUnits.length / pageLength);
  const [currentPage, setPageNumber] = useState(0);
  const currentPageStartIndex = currentPage * pageLength;
  const currentPageEndIndex = (currentPage + 1) * pageLength;
  const characterUnitsPage = characterUnits.slice(
    currentPageStartIndex,
    currentPageEndIndex
  );
  const characterCoverageBitmapPage = characterCoverageBitmap.slice(
    currentPageStartIndex,
    currentPageEndIndex
  );

  return (
    <fieldset>
      <div role="heading">
        <legend>
          Character Preview
        </legend>
        {totalPages > 1 && (
          <span>
            <label htmlFor="page-selector">
              Page <select
                id="page-selector"
                onChange={event => setPageNumber(+event.target.value)}
                value={currentPage}
              >
                {(new Array(totalPages)).fill(0).map((_, i) => (
                  <option
                    key={i}
                    value={i}
                  >
                    {i + 1}
                  </option>
                ))}
              </select>
            </label> of {totalPages}
          </span>)}
      </div>
      <div className="character-gallery__character-layers">
        <CharacterGalleryLayer
          category="included"
          style={{
            fontFamily: `"${familyPrefix}${family}", serif`,
            fontVariationSettings: cssProperties.fontVariationSettings, // *
            fontStyle: cssProperties.fontStyle, // Needs to be set >:(
          }}
        >
          <CharacterUnits
            category="included"
            {...{
              characterUnits: characterUnitsPage,
              characterCoverageBitmap: characterCoverageBitmapPage
            }}
          />
        </CharacterGalleryLayer>
        <CharacterGalleryLayer category="missing">
          <CharacterUnits
            category="missing"
            {...{
              characterUnits: characterUnitsPage,
              characterCoverageBitmap: characterCoverageBitmapPage
            }}
          />
        </CharacterGalleryLayer>
      </div>
    </fieldset>
  );
};

/**
 * * 04/04/2023
 * `fontVariationSettings: "ital" 1` is supposed to override its counterpart
 *  heigh-level property `font-style` but is not working (it used to). For now,
 *  we need to use `font-style` to ensure the correct style is used.
 */
