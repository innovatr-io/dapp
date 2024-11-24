import { CreatorProject } from '../projects-data-access'
import { ProjectCard } from './project-card'

interface ProjectsListProps {
  projects: CreatorProject[]
  isLoading: boolean
}

export function ProjectsList({ projects, isLoading }: ProjectsListProps) {
  if (isLoading) {
    return <div>Loading your projects...</div>
  }

  if (!projects.length) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
        <p className="text-muted-foreground">
          Create your first project to start raising funds!
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
