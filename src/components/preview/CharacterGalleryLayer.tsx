type CharacterGalleryLayerProps = {
  category: "included" | "missing",
  children: React.ReactNode,
  style?: React.CSSProperties
};

const characterGalleryLayerClass = 'character-gallery__character-layer';

export default function CharacterGalleryLayer({
  category,
  children,
  style
}: CharacterGalleryLayerProps) {
  return (
    <div
      className={`${characterGalleryLayerClass
        } ${characterGalleryLayerClass}--${category}`}
      style={style}
    >
      {children}
    </div>
  );
}
