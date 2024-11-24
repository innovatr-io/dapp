import { UserProject } from './projects-data-access'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDistance } from 'date-fns'

interface ProjectsListProps {
  projects: UserProject[]
  isLoading: boolean
}

export function ProjectsList({ projects, isLoading }: ProjectsListProps) {
  if (isLoading) {
    return <div>Loading your investments...</div>
  }

  if (!projects.length) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">No investments yet</h3>
        <p className="text-muted-foreground">
          Explore the marketplace to find exciting music projects to invest in!
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

function ProjectCard({ project }: { project: UserProject }) {
  const progress = (project.totalRaised / project.goal) * 100
  const timeLeft = formatDistance(new Date(), project.endDate)

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="object-cover w-full h-full"
        />
        <Badge
          className="absolute top-2 right-2"
          variant={project.status === 'funded' ? 'success' : 'default'}
        >
          {project.status === 'funded' ? 'Funded' : 'Active'}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.artist}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Your Investment</p>
              <p className="font-medium">${project.invested}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Return Rate</p>
              <p className="font-medium">{project.returnRate}%</p>
            </div>
          </div>

          {project.status === 'funded' && project.claimableReturns > 0 && (
            <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                Claimable Returns: ${project.claimableReturns}
              </p>
              <Button className="w-full mt-2" size="sm">
                Claim Returns
              </Button>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            {project.status === 'active' ? (
              <p>Ends in {timeLeft}</p>
            ) : (
              <p>Funding {project.status}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
