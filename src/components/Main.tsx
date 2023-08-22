import { useAppSelector } from "../stores/hooks";
import Form from "./form/Form";
import Output from "./output/Output";
import OutputPlaceholder from "./output/OutputPlaceholder";
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

  return (
    <main>
      <Form />
      {hasOutput ? (<>
        <OutputSummary />
        {!(isFailed || isLoading) && (<>
          <Output />
          <Preview />
        </>)}
      </>) : (
        <OutputPlaceholder />
      )}
    </main>
  );
}
