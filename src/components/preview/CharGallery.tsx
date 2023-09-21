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
        fontStretch: cssProperties.fontStretch,
        fontStyle: cssProperties.fontStyle,
        fontVariationSettings: cssProperties.fontVariationSettings,
        fontWeight: cssProperties.fontWeight,
        fontOpticalSizing: cssProperties.fontOpticalSizing as 'auto' | undefined // Type complain about a non existent/standard type. 
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
