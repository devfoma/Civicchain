import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function PendingRequests() {
  const requests = [
    {
      id: 1,
      citizenName: "John Doe",
      requestType: "License Renewal",
      submittedDate: "2025-11-07",
      status: "pending",
    },
    {
      id: 2,
      citizenName: "Jane Smith",
      requestType: "Tax Certificate",
      submittedDate: "2025-11-06",
      status: "pending",
    },
    {
      id: 3,
      citizenName: "Ahmed Hassan",
      requestType: "Address Verification",
      submittedDate: "2025-11-05",
      status: "pending",
    },
  ]

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-lg font-semibold mb-4">Pending Requests</h2>
      <div className="space-y-3">
        {requests.map((req) => (
          <div
            key={req.id}
            className="p-4 rounded-lg border border-border/40 bg-card/50 hover:bg-card/80 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-sm">{req.citizenName}</h4>
                <p className="text-xs text-muted-foreground">{req.requestType}</p>
              </div>
              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-700 border-yellow-200">
                Pending
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Submitted: {req.submittedDate}</p>
              <Button size="sm" variant="outline">
                Review
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
