type CharacterGalleryLayerProps = {
  category: "included" | "missing",
  children: React.ReactNode,
  style?: React.CSSProperties
};

const className = 'character-gallery__character-layer';

export default function CharacterGalleryLayer({
  category,
  children,
  style
}: CharacterGalleryLayerProps) {
  return (
    <div
      className={`${className} ${className}--${category}`}
      style={style}
    >
      {children}
    </div>
  );
}
