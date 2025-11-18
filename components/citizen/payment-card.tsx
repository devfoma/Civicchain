import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PaymentCard() {
  return (
    <Card className="p-6 border border-border/40 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-1">Account Balance</p>
        <h3 className="text-3xl font-bold">₦ 50,000</h3>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Status</span>
          <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
            Active
          </Badge>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Last Updated</span>
          <span>Today</span>
        </div>
      </div>
    </Card>
  )
}
