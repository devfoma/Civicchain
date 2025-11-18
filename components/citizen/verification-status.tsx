import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

export function VerificationStatus() {
  const verifications = [
    {
      id: 1,
      name: "Identity Verification",
      status: "verified",
      date: "2025-10-15",
      icon: CheckCircle2,
    },
    {
      id: 2,
      name: "Address Proof",
      status: "pending",
      date: "In Progress",
      icon: Clock,
    },
    {
      id: 3,
      name: "Tax Certificate",
      status: "rejected",
      date: "2025-09-20",
      icon: AlertCircle,
    },
  ]

  return (
    <Card className="p-6 border border-border bg-card">
      <h2 className="text-lg font-semibold mb-4">Verification Status</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {verifications.map((item) => {
          const IconComponent = item.icon
          const statusColors = {
            verified: "bg-accent/20 text-accent border-accent",
            pending: "bg-primary/20 text-primary border-primary",
            rejected: "bg-destructive/20 text-destructive border-destructive",
          }

          return (
            <div key={item.id} className="p-4 rounded-lg border border-border bg-card/60">
              <div className="flex items-start justify-between mb-3">
                <IconComponent className="h-5 w-5 text-accent" />
                <Badge variant="outline" className={statusColors[item.status as keyof typeof statusColors]}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Badge>
              </div>
              <h4 className="font-medium text-sm mb-1">{item.name}</h4>
              <p className="text-xs text-muted-foreground">{item.date}</p>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
