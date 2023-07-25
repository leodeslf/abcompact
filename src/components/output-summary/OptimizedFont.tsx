import OptimizedFontBody from "./OptimizedFontBody";
import OptimizedFontBodyWithError from "./OptimizedFontBodyWithError";

export default function OptimizedFont(optimizedFont: OptimizedFont) {
  return "results" in optimizedFont ? (
    <OptimizedFontBody {...optimizedFont as OptimizedFontWithoutError} />
  ) : (
    <OptimizedFontBodyWithError {...optimizedFont as OptimizedFontWithError} />
  );
}
