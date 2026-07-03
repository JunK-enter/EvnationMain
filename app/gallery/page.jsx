import { pageMetadata } from '@/lib/site'
import GalleryPage from '@/views/GalleryPage'

export const metadata = pageMetadata({
  title: 'Install Gallery',
  description: 'Installation photos, completed work, and partner & dealer visits from evNation field crews across California and our service states.',
  path: '/gallery',
})

export default function Page() {
  return <GalleryPage />
}
