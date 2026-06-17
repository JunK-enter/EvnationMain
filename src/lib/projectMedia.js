import { projects } from '@/data/projects'

/** Stock imagery by project type until real photos are uploaded */
export const PROJECT_STOCK_COVERS = {
  ev: '/images/solutions/domestic-ev-charger-768x308.jpg',
  panel: '/images/warranty-hero.png',
  solar: '/images/solutions/domestic-solar-systems-768x308.jpg',
  commercial: '/images/solutions/commercial-ev-charger-768x308.jpg',
}

export function enrichProjectMedia(project) {
  const stock = PROJECT_STOCK_COVERS[project.type] || PROJECT_STOCK_COVERS.ev
  const images = project.images || {}
  return {
    ...project,
    images: {
      before: images.before || null,
      after: images.after || stock,
      cover: images.cover || stock,
    },
  }
}

export function getFeaturedProjects(limit = 3) {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  return [...featured, ...rest].slice(0, limit).map(enrichProjectMedia)
}

export function getGalleryProjects(limit = 4) {
  return projects.slice(0, limit).map(enrichProjectMedia)
}

export function getFeaturedProject() {
  const p = projects.find((x) => x.featured) || projects[0]
  return enrichProjectMedia(p)
}
