type CharGalleryLayerProps = {
  children: React.ReactNode,
  style?: React.CSSProperties
};

const charGalleryLayerClass = 'char-gallery__layer';

export default function CharGalleryLayer({
  children,
  style
}: CharGalleryLayerProps) {
  return (
    <div
      className={`${charGalleryLayerClass} ${charGalleryLayerClass}--${style !== undefined ? 'included' : 'missing'}`}
      style={style}
    >
      {children}
    </div>
  );
}
