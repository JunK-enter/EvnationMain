/** evNation video — homepage section */
export const evNationVideo = {
  /** Self-hosted hero video (preferred when set) */
  localSrc: '/videos/evnation-hero.mov',
  localType: 'video/quicktime',
  channelUrl: 'https://www.youtube.com/@evNation_us',
  channelHandle: '@evNation_us',
  /** Optional YouTube fallback embed (YouTube video ID) */
  featuredVideoId: process.env.NEXT_PUBLIC_EVNATION_YOUTUBE_VIDEO_ID || '',
  posterSrc: '/images/solutions/domestic-ev-charger-768x308.jpg',
}

export function getYouTubeEmbedUrl(videoId) {
  if (!videoId) return null
  const params = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  })
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params}`
}

export function getYouTubePosterUrl(videoId) {
  if (!videoId) return null
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}
