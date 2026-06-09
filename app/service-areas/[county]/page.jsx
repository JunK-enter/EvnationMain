import { notFound } from 'next/navigation'
import { pageMetadata } from '@/lib/site'
import ServiceAreaJsonLd from '@/components/ServiceAreaJsonLd'
import CountyServicePage from '@/views/CountyServicePage'
import {
  getAllCountySlugs,
  getCountyBySlug,
  buildCountyTitle,
  buildCountyDescription,
} from '@/data/serviceAreasSeo'

export function generateStaticParams() {
  return getAllCountySlugs().map((county) => ({ county }))
}

export async function generateMetadata({ params }) {
  const { county: slug } = await params
  const county = getCountyBySlug(slug)
  if (!county) return {}

  return pageMetadata({
    title: buildCountyTitle(county),
    description: buildCountyDescription(county),
    path: `/service-areas/${county.slug}`,
  })
}

export default async function Page({ params }) {
  const { county: slug } = await params
  const county = getCountyBySlug(slug)
  if (!county) notFound()

  return (
    <>
      <ServiceAreaJsonLd counties={[county]} />
      <CountyServicePage county={county} />
    </>
  )
}
