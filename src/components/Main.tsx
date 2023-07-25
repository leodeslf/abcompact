import { useAppSelector } from "../stores/hooks";
import Form from "./form/Form";
import Output from "./output/Output";
import OutputPlaceholder from "./OutputPlaceholder";
import OutputSummary from "./output-summary/OutputSummary";
import Preview from "./preview/Preview";

export default function Main() {
  const {
    optimizedFonts,
    requestStatus: {
      isLoading,
      isFailed
    }
  } = useAppSelector(state => state);
  const hasOutput = optimizedFonts.length > 0;
  const hasOutputToPreview = (
    !(isLoading && isFailed) &&
    optimizedFonts.find(font => "results" in font)
  );

  return (
    <main>
      <Form />
      {hasOutput ? (<>
        <OutputSummary />
        <Output />
      </>) : (
        <OutputPlaceholder />
      )}
      {hasOutputToPreview && (<>
        <Preview />
      </>)}
    </main>
  );
}
