import { pageMetadata } from '@/lib/site'
import ProjectsPage from '@/views/ProjectsPage'

export const metadata = pageMetadata({
  title: 'Projects & Portfolio',
  description: 'Permitted EV charger, panel upgrade, and solar-ready electrical installs across California and our service states.',
  path: '/projects',
})

export default function Page() {
  return <ProjectsPage />
}
