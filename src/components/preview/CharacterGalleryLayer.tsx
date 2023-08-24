type CharacterGalleryLayerProps = {
  children: React.ReactNode,
  style?: React.CSSProperties
};

const characterGalleryLayerClass = 'character-gallery__layer';

export default function CharacterGalleryLayer({
  children,
  style
}: CharacterGalleryLayerProps) {
  return (
    <div
      className={`${characterGalleryLayerClass} ${characterGalleryLayerClass
        }--${style !== undefined ? 'included' : 'missing'}`}
      style={style}
    >
      {children}
    </div>
  );
}
