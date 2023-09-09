import { familyPrefix, usePreviewPagination } from "../../ts/gui";
import { memo, useMemo } from "react";
import { useAppSelector } from "../../stores/hooks";
import CharGalleryLayer from "./CharGalleryLayer";
import CharMolecules from "./CharMolecules";

const CharMoleculesMemo = memo(CharMolecules);

type CharGalleryProps = {
  fontIndex: number,
  styleIndex: number,
  pageIndex: number
};

export default function CharGallery({
  fontIndex,
  styleIndex,
  pageIndex
}: CharGalleryProps) {
  const {
    optimizedFonts,
    requestMemo: {
      charMolecules
    }
  } = useAppSelector(state => state);
  const {
    results: {
      charMoleculesBitmap,
      styles
    },
    family
  } = optimizedFonts[fontIndex] as OptimizedFontWithoutError;
  const { cssProperties } = styles[styleIndex];
  const [pageStart, pageEnd] = usePreviewPagination(pageIndex);
  const charMoleculesPage = useMemo(
    () => charMolecules.slice(pageStart, pageEnd),
    [pageIndex]
  );
  const charMoleculesBitmapPage = useMemo(
    () => charMoleculesBitmap.slice(pageStart, pageEnd),
    [charMoleculesBitmap, pageIndex]
  );

  return (
    <div className="char-gallery">
      <CharGalleryLayer style={{
        fontFamily: `"${familyPrefix}${family}", serif`,
        fontVariationSettings: cssProperties.fontVariationSettings, // *
        fontStyle: cssProperties.fontStyle, // Needs to be set >:(
      }}>
        <CharMoleculesMemo
          bitToMatch={1}
          charMoleculesBitmap={charMoleculesBitmapPage}
          charMolecules={charMoleculesPage}
        />
      </CharGalleryLayer>
      <CharGalleryLayer>
        <CharMoleculesMemo
          bitToMatch={0}
          charMoleculesBitmap={charMoleculesBitmapPage}
          charMolecules={charMoleculesPage}
        />
      </CharGalleryLayer>
    </div>
  );
};

/**
 * * 04/04/2023
 * `fontVariationSettings: "ital" 1` is supposed to override its counterpart
 *  heigh-level property `font-style` but is not working (it used to). For now,
 *  we need to use `font-style` to ensure the correct style is used.
 */
