import { useState } from "react";
import { useAppSelector } from "../../stores/hooks";
import CharGallery from "./CharGallery";
import FontSelect from "./FontSelect";
import StyleSelect from "./StyleSelect";
import PageSelect from "./PageSelect";
import Heading from "../common/Heading";

export default function Preview() {
  const { optimizedFonts } = useAppSelector(state => state);
  const [fontIndex, setFontIndex] = useState((
    optimizedFonts.find(font => font.errorMessage === undefined) as
    OptimizedFontWithoutError
  ).id);
  const [styleIndex, setStyleIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);

  return (
    <div>
      <div className="preview-selects__container">
        <span>
          <FontSelect {...{
            fontIndex,
            setFontIndex,
            setStyleIndex
          }} />
        </span>
        <span>
          <StyleSelect {...{
            fontIndex,
            styleIndex,
            setStyleIndex
          }} />
        </span>
      </div>
      <fieldset>
        <Heading>
          <legend>
            Preview
          </legend>
          <PageSelect
            {...{
              pageIndex,
              setPageIndex
            }}
          />
        </Heading>
        <CharGallery
          {...{
            fontIndex,
            pageIndex,
            styleIndex
          }}
        />
      </fieldset>
    </div>
  );
}
