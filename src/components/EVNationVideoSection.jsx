'use client'

import { useRef, useState } from 'react'
import Link from '@/components/Link'
import { ArrowRight, ExternalLink, Play } from 'lucide-react'
import SectionAmbient from './SectionAmbient'
import SectionHeader from './SectionHeader'
import { useTranslation } from '@/i18n/LocaleProvider'
import Reveal from '@/lib/Reveal'
import {
  evNationVideo,
  getYouTubeEmbedUrl,
  getYouTubePosterUrl,
} from '@/data/evNationVideo'

function VideoPlayer({
  localSrc,
  localType,
  videoId,
  channelUrl,
  posterSrc,
  playLabel,
  watchChannelLabel,
}) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const embedUrl = getYouTubeEmbedUrl(videoId)
  const poster = (videoId && getYouTubePosterUrl(videoId)) || posterSrc
  const channelVideosUrl = `${channelUrl}/videos`

  function handlePlay() {
    if (localSrc) {
      setPlaying(true)
      requestAnimationFrame(() => {
        const el = videoRef.current
        if (!el) return
        el.play().catch(() => {})
      })
      return
    }
    if (embedUrl) {
      setPlaying(true)
      return
    }
    window.open(channelVideosUrl, '_blank', 'noopener,noreferrer')
  }

  if (playing && localSrc) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-navy-950 border border-white/10">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover bg-black"
          controls
          playsInline
          preload="metadata"
          poster={poster}
        >
          <source src={localSrc} type={localType} />
        </video>
      </div>
    )
  }

  if (playing && embedUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-navy-950 border border-white/10">
        <iframe
          src={embedUrl}
          title="evNation video"
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      className="group relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-navy-900 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neon/50"
      aria-label={playLabel}
    >
      <img
        src={poster}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.02] max-lg:group-hover:scale-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/35 to-navy-950/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
        <span className="flex h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] items-center justify-center rounded-full bg-neon text-navy-950 shadow-[0_0_40px_rgba(0,255,136,0.35)] transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-0.5" />
        </span>
        <span className="text-sm sm:text-base font-semibold text-white">{playLabel}</span>
        {!localSrc && !embedUrl && (
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
            <ExternalLink className="w-3.5 h-3.5 text-neon/80" />
            {watchChannelLabel}
          </span>
        )}
      </div>
    </button>
  )
}

export default function EVNationVideoSection() {
  const { t } = useTranslation()
  const { channelUrl, channelHandle, featuredVideoId, posterSrc, localSrc, localType } = evNationVideo

  const highlights = [
    t('home.video.highlight1'),
    t('home.video.highlight2'),
    t('home.video.highlight3'),
  ]

  return (
    <section id="evnation-video" className="section-padding relative overflow-hidden section-scrim-alt">
      <SectionAmbient sweep />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader
          eyebrow={t('home.video.eyebrow')}
          title={t('home.video.title')}
          subtitle={t('home.video.subtitle')}
          className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto"
          subtitleClassName="text-sm sm:text-base text-slate-400 leading-relaxed"
        />

        <div className="grid lg:grid-cols-[1.12fr_0.88fr] gap-8 lg:gap-10 lg:items-center">
          <Reveal y={16}>
            <div className="glass rounded-3xl p-2 sm:p-3 neon-border">
              <VideoPlayer
                localSrc={localSrc}
                localType={localType}
                videoId={featuredVideoId}
                channelUrl={channelUrl}
                posterSrc={posterSrc}
                playLabel={t('home.video.play')}
                watchChannelLabel={t('home.video.watchChannel', { handle: channelHandle })}
              />
            </div>
          </Reveal>

          <Reveal delay={0.08} y={16} className="flex flex-col">
            <ul className="space-y-4 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/quote" className="btn-primary justify-center">
                {t('common.getQuote')} <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary justify-center"
              >
                <ExternalLink className="w-4 h-4" />
                {t('home.video.youtubeCta')}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
