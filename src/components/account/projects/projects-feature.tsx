import { useUserProjects } from './projects-data-access'
import { ProjectsList } from './projects-ui'

export function ProjectsFeature() {
  const { data: projects = [], isLoading } = useUserProjects()

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Investments</h1>
        <p className="text-muted-foreground mt-2">
          Track your music investments and returns
        </p>
      </div>

      <ProjectsList projects={projects} isLoading={isLoading} />
    </div>
  )
}
