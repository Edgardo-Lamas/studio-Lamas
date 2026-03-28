export default function LogoSVG({ size = 28, className = '' }) {
  const scale = size / 22
  return (
    <svg
      viewBox="0 0 14 22"
      fill="none"
      width={14 * scale}
      height={22 * scale}
      className={className}
      aria-hidden="true"
    >
      <rect x="0"   y="0"    width="3.5" height="22"  rx="1.75" fill="#c9a227" />
      <rect x="0"   y="0"    width="11"  height="3.5" rx="1.75" fill="#c9a227" />
      <rect x="0"   y="9.25" width="8"   height="3.5" rx="1.75" fill="#c9a227" />
      <rect x="0"   y="18.5" width="11"  height="3.5" rx="1.75" fill="#c9a227" />
    </svg>
  )
}
