'use client'

import { useTranslation } from '@/i18n/LocaleProvider'

export default function LegalLayout({ eyebrow, title, lastUpdated, intro, sections }) {
  const { t } = useTranslation()

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          {eyebrow && <p className="text-neon text-sm font-semibold tracking-wider uppercase mb-3">{eyebrow}</p>}
          <h1 className="font-display text-4xl font-bold">{title}</h1>
          {lastUpdated && (
            <p className="text-slate-500 text-sm mt-3">
              {t('legal.lastUpdatedLabel', { date: lastUpdated })}
            </p>
          )}
        </div>

        {intro && <p className="text-slate-300 leading-relaxed mb-8">{intro}</p>}

        <div className="space-y-8">
          {sections.map((section, i) => (
            <section key={i} className="glass rounded-2xl p-6 lg:p-8">
              <h2 className="font-display text-xl font-semibold mb-3">{section.heading}</h2>
              <div className="space-y-3">
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-slate-300 leading-relaxed text-sm">{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="text-xs text-slate-500 mt-10">
          {t('legal.disclaimerFooter')} {t('legal.disclaimerContact')}
        </p>
      </div>
    </div>
  )
}
