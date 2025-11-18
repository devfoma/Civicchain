import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, AlertCircle, TrendingUp } from "lucide-react"

export function DailyStats() {
  const stats = [
    {
      label: "Total Approvals",
      value: "24",
      change: "+12%",
      icon: CheckCircle2,
      color: "text-accent",
    },
    {
      label: "Pending Reviews",
      value: "8",
      change: "-3%",
      icon: Clock,
      color: "text-accent",
    },
    {
      label: "Rejected",
      value: "2",
      change: "+0%",
      icon: AlertCircle,
      color: "text-accent",
    },
    {
      label: "Total Revenue",
      value: "₦ 145K",
      change: "+8%",
      icon: TrendingUp,
      color: "text-accent",
    },
  ]

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <Card key={i} className="p-4 border border-border bg-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-xs text-accent mt-1">{stat.change}</p>
              </div>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
