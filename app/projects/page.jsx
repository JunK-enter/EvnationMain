import { pageMetadata } from '@/lib/site'
import ProjectsPage from '@/views/ProjectsPage'

export const metadata = pageMetadata({
  title: 'Projects & Portfolio',
  description: 'Real EV charger, panel upgrade, and solar installations across Southern California.',
  path: '/projects',
})

export default function Page() {
  return <ProjectsPage />
}
