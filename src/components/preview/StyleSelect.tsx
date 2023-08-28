import { useAppSelector } from "../../stores/hooks";
import { getReadableCssProperties } from "../../ts/gui";

type StylePickerProps = {
  fontIndex: number,
  styleIndex: number,
  setStyleIndex: (index: number) => void
};

export default function StylePicker({
  fontIndex,
  styleIndex,
  setStyleIndex
}: StylePickerProps) {
  const { optimizedFonts } = useAppSelector(state => state);
  const styles = (
    optimizedFonts[fontIndex] as OptimizedFontWithoutError
  ).results.styles;
  const styleOptions = styles.map(style =>
    getReadableCssProperties(style.cssProperties.fontVariationSettings));

  return (
    <span>
      <label htmlFor="style-picker">
        Style
      </label>
      <select
        id="style-picker"
        onChange={event => setStyleIndex(event.target.selectedIndex)}
        value={styleIndex}
      >
        {styleOptions.map((styleOption, index) => (
          <option
            key={index}
            value={index}
          >
            {styleOption}
          </option>
        ))}
      </select>
    </span>
  );
}
