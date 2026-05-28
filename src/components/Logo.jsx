const LOGO_SRC = '/logo.png?v=2'

const heights = {
  sm: 'h-9',
  md: 'h-8 lg:h-11',
  lg: 'h-14',
  xl: 'h-[4.5rem]',
}

const imgClass = 'logo-blend select-none'

function LogoIcon({ size, className = '', blend = true }) {
  const height = heights[size] ?? heights.md
  return (
    <div className={`${height} aspect-square overflow-hidden shrink-0 ${className}`}>
      <img
        src={LOGO_SRC}
        alt="evNation"
        className={`${height} w-auto max-w-none ${blend ? imgClass : ''}`}
        draggable={false}
      />
    </div>
  )
}

function LogoFull({ size, className = '', blend = true }) {
  const height = heights[size] ?? heights.md
  return (
    <img
      src={LOGO_SRC}
      alt="evNation"
      className={`${height} w-auto shrink-0 object-contain ${blend ? imgClass : ''} ${className}`}
      draggable={false}
    />
  )
}

export default function Logo({
  size = 'md',
  variant = 'full',
  compactOnMobile = false,
  blend = true,
  className = '',
}) {
  if (variant === 'icon') {
    return <LogoIcon size={size} blend={blend} className={className} />
  }

  if (compactOnMobile) {
    return (
      <>
        <LogoIcon size={size} blend={blend} className={`sm:hidden ${className}`} />
        <LogoFull size={size} blend={blend} className={`hidden sm:block ${className}`} />
      </>
    )
  }

  return <LogoFull size={size} blend={blend} className={className} />
}
