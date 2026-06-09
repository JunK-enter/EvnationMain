'use client'

import NextLink from 'next/link'

/**
 * Drop-in replacement for react-router-dom Link (uses `to` or `href`).
 */
export default function Link({ to, href, children, className, onClick, ...rest }) {
  const path = href ?? to ?? '/'
  return (
    <NextLink href={path} className={className} onClick={onClick} {...rest}>
      {children}
    </NextLink>
  )
}
