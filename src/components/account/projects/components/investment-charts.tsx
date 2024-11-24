import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { CreatorProject } from '../projects-data-access'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

interface InvestmentChartsProps {
  projects: CreatorProject[]
}

export function InvestmentCharts({ projects }: InvestmentChartsProps) {
  // Calculate monthly investments
  const monthlyData = projects.reduce((acc, project) => {
    const month = new Date(project.endDate).toLocaleString('default', { month: 'short' })
    acc[month] = (acc[month] || 0) + project.totalRaised
    return acc
  }, {} as Record<string, number>)

  // Calculate cumulative investments
  const months = Object.keys(monthlyData)
  const cumulativeData = months.reduce((acc, month, index) => {
    const previousTotal = index > 0 ? acc[months[index - 1]] : 0
    acc[month] = previousTotal + monthlyData[month]
    return acc
  }, {} as Record<string, number>)

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Investment',
        data: Object.values(monthlyData),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        type: 'bar' as const,
      },
      {
        label: 'Cumulative Investment',
        data: Object.values(cumulativeData),
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        type: 'line' as const,
        yAxisID: 'cumulative',
      },
    ],
  }

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: false
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Monthly Investment ($)',
        },
      },
      cumulative: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Cumulative Investment ($)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  return (
    <div className="w-full h-[300px]">
      <Bar data={chartData as ChartData<"bar", number[], string>} options={options} />
    </div>
  )
}
