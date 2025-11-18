import { Card } from "@/components/ui/card"
import { CheckCircle2, AlertCircle, TrendingUp, BarChart3 } from "lucide-react"

export function ComplianceMetrics() {
  const metrics = [
    {
      label: "Compliance Score",
      value: "98.5%",
      change: "+2.1%",
      icon: CheckCircle2,
      color: "text-accent",
    },
    {
      label: "Audited Transactions",
      value: "1,245",
      change: "+156",
      icon: BarChart3,
      color: "text-accent",
    },
    {
      label: "Flagged Issues",
      value: "3",
      change: "-1",
      icon: AlertCircle,
      color: "text-accent",
    },
    {
      label: "System Integrity",
      value: "99.2%",
      change: "+0.3%",
      icon: TrendingUp,
      color: "text-accent",
    },
  ]

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {metrics.map((metric, i) => {
        const Icon = metric.icon
        return (
          <Card key={i} className="p-4 border border-border bg-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                <h3 className="text-2xl font-bold">{metric.value}</h3>
                <p className="text-xs text-accent mt-1">{metric.change}</p>
              </div>
              <Icon className={`h-5 w-5 ${metric.color}`} />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
