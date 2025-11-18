import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileCheck, Eye } from "lucide-react"
import { PaymentForm } from "./payment-form"

export function QuickActions() {
  return (
    <Card className="p-6 border border-border bg-card">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <PaymentForm />
        <Button
          variant="outline"
          className="h-auto flex flex-col items-center justify-center p-4 gap-2 bg-transparent border-border"
        >
          <FileCheck className="h-5 w-5 text-accent" />
          <span className="text-sm font-medium">Submit Verification</span>
        </Button>
        <Button
          variant="outline"
          className="h-auto flex flex-col items-center justify-center p-4 gap-2 bg-transparent border-border"
        >
          <Eye className="h-5 w-5 text-accent" />
          <span className="text-sm font-medium">View Records</span>
        </Button>
      </div>
    </Card>
  )
}
