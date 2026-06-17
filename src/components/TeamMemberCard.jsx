'use client'

import { useState } from 'react'
import { User } from 'lucide-react'

function initials(name) {
  return name
    .replace(/,.*$/, '')
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function TeamMemberCard({ member }) {
  const [imageError, setImageError] = useState(false)
  const showPhoto = member.image && !imageError

  return (
    <article className="flex flex-col sm:flex-row gap-5 sm:gap-8 lg:gap-10">
      <div className="w-full max-w-[200px] sm:w-40 md:w-44 lg:w-48 shrink-0">
        <div className="relative aspect-[5/6] rounded-2xl overflow-hidden bg-navy-800 border border-white/[0.08]">
          {showPhoto ? (
            <img
              src={member.image}
              alt={member.name}
              className="absolute inset-0 w-full h-full object-cover object-top"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950">
              <span className="font-display text-3xl font-bold text-neon/80 mb-2">{initials(member.name)}</span>
              <User className="w-7 h-7 text-slate-600" aria-hidden />
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0 pt-0 sm:pt-1">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">{member.name}</h3>
        <p className="font-display text-base sm:text-lg font-semibold text-white mt-1 mb-4">{member.title}</p>
        <p className="text-sm sm:text-[15px] text-slate-400 leading-relaxed">{member.bio}</p>
      </div>
    </article>
  )
}
