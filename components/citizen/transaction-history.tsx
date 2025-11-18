"use client"

import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

export function TransactionHistory() {
  const transactions = [
    {
      id: 1,
      type: "payment",
      description: "Civic License Renewal",
      amount: "₦ 5,000",
      date: "2025-11-08",
      status: "completed",
      txHash: "0x1a2b...3c4d",
    },
    {
      id: 2,
      type: "refund",
      description: "Tax Overpayment Refund",
      amount: "₦ 2,500",
      date: "2025-11-05",
      status: "completed",
      txHash: "0x5e6f...7g8h",
    },
    {
      id: 3,
      type: "payment",
      description: "Utility Bill Payment",
      amount: "₦ 3,200",
      date: "2025-11-01",
      status: "completed",
      txHash: "0x9i0j...1k2l",
    },
    {
      id: 4,
      type: "payment",
      description: "Property Tax",
      amount: "₦ 10,000",
      date: "2025-10-28",
      status: "completed",
      txHash: "0x3m4n...5o6p",
    },
  ]

  return (
    <Card className="p-6 border border-border/40">
      <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border/40">
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tx Hash</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id} className="border-b border-border/40">
                <TableCell>
                  <div className="flex items-center gap-2">
                    {tx.type === "payment" ? (
                      <ArrowUpRight className="h-4 w-4 text-red-500" />
                    ) : (
                      <ArrowDownLeft className="h-4 w-4 text-green-500" />
                    )}
                    <span className="text-sm capitalize">{tx.type}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{tx.description}</TableCell>
                <TableCell className="font-medium">{tx.amount}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{tx.date}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-accent font-mono">{tx.txHash}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
