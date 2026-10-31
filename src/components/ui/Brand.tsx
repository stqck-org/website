export function PixelMark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={`pixel-mark ${compact ? "pixel-mark--compact" : ""}`}
      aria-hidden="true"
    >
      {Array.from({ length: 16 }, (_, index) => (
        <i key={index} />
      ))}
    </span>
  )
}

export function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span
      className={`brand-logo ${inverse ? "brand-logo--inverse" : ""}`}
      aria-label="stqck, provisional wordmark"
    >
      st<span>q</span>ck
      <sup>°</sup>
    </span>
  )
}
