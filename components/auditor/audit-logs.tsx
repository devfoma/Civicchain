import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function AuditLogs() {
  const logs = [
    {
      id: 1,
      timestamp: "2025-11-08 14:32:15",
      action: "Transaction Approved",
      actor: "Officer John",
      target: "CIT-001",
      status: "success",
      txHash: "0x1a2b...3c4d",
    },
    {
      id: 2,
      timestamp: "2025-11-08 13:45:22",
      action: "Verification Completed",
      actor: "Officer Jane",
      target: "CIT-002",
      status: "success",
      txHash: "0x5e6f...7g8h",
    },
    {
      id: 3,
      timestamp: "2025-11-08 12:18:09",
      action: "Payment Rejected",
      actor: "Officer Ahmed",
      target: "CIT-003",
      status: "warning",
      txHash: "0x9i0j...1k2l",
    },
    {
      id: 4,
      timestamp: "2025-11-08 11:02:44",
      action: "Account Flagged",
      actor: "System Alert",
      target: "CIT-004",
      status: "error",
      txHash: "0x3m4n...5o6p",
    },
    {
      id: 5,
      timestamp: "2025-11-08 09:55:31",
      action: "Bulk Verification",
      actor: "Officer Grace",
      target: "Batch-001",
      status: "success",
      txHash: "0x7q8r...9s0t",
    },
  ]

  const statusColors = {
    success: "bg-green-500/10 text-green-700 border-green-200",
    warning: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
    error: "bg-red-500/10 text-red-700 border-red-200",
  }

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-lg font-semibold mb-4">Immutable Audit Logs</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border/40">
              <TableHead>Timestamp</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tx Hash</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id} className="border-b border-border/40">
                <TableCell className="text-sm text-muted-foreground">{log.timestamp}</TableCell>
                <TableCell className="text-sm font-medium">{log.action}</TableCell>
                <TableCell className="text-sm">{log.actor}</TableCell>
                <TableCell className="text-sm font-mono text-accent">{log.target}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[log.status as keyof typeof statusColors]}>
                    {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-accent font-mono">{log.txHash}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
