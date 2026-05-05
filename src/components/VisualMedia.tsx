type VisualMediaProps = {
  image: {
    src: string;
    alt: string;
  };
  className?: string;
  label?: string;
  loading?: 'eager' | 'lazy';
};

export function VisualMedia({ image, className = '', label, loading = 'lazy' }: VisualMediaProps) {
  return (
    <figure className={`visual-media ${className}`}>
      <img src={image.src} alt={image.alt} loading={loading} />
      {label ? <figcaption>{label}</figcaption> : null}
    </figure>
  );
}
