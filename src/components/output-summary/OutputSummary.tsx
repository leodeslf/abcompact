import EmptyTr from "./EmptyTr";
import FilesWeight from "./FilesWeight";
import OptimizedFonts from "./OptimizedFonts";
import OutputSummaryFootnote from "./OutputSummaryFootnote";
import OutputSummaryTotal from "./OutputSummaryTotal";

export default function OutputSummary() {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>
              Font
            </th>
            <th colSpan={2}>
              Default
            </th>
            <th colSpan={2}>
              Optimized
            </th>
          </tr>
        </thead>
        <tbody>
          <OptimizedFonts />
          <EmptyTr />
          <FilesWeight />
          <EmptyTr />
          <OutputSummaryTotal />
        </tbody>
      </table>
      <OutputSummaryFootnote />
    </div>
  );
}