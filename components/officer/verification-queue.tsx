import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function VerificationQueue() {
  const verifications = [
    {
      id: 1,
      citizenId: "CIT-001",
      citizenName: "John Doe",
      verificationType: "Identity",
      submittedDate: "2025-11-08",
      status: "review",
    },
    {
      id: 2,
      citizenId: "CIT-002",
      citizenName: "Jane Smith",
      verificationType: "Address",
      submittedDate: "2025-11-07",
      status: "review",
    },
    {
      id: 3,
      citizenId: "CIT-003",
      citizenName: "Ahmed Hassan",
      verificationType: "Tax Certificate",
      submittedDate: "2025-11-06",
      status: "review",
    },
    {
      id: 4,
      citizenId: "CIT-004",
      citizenName: "Chioma Okafor",
      verificationType: "Identity",
      submittedDate: "2025-11-05",
      status: "review",
    },
  ]

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-lg font-semibold mb-4">Verification Queue</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border/40">
              <TableHead>Citizen ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Verification Type</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {verifications.map((verification) => (
              <TableRow key={verification.id} className="border-b border-border/40">
                <TableCell className="text-sm font-mono text-accent">{verification.citizenId}</TableCell>
                <TableCell className="text-sm">{verification.citizenName}</TableCell>
                <TableCell className="text-sm">{verification.verificationType}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{verification.submittedDate}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-200">
                    In Review
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
