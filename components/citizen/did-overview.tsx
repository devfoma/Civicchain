"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useDidStore } from "@/lib/store"
import { Shield, Copy, ExternalLink } from "lucide-react"
import Link from "next/link"

export function DidOverview() {
  const identity = useDidStore((state) => state.identity)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const credentialCount = identity?.credentials.length || 0
  const verifiedCount = identity?.credentials.filter((c) => c.verified).length || 0

  return (
    <div className="space-y-6">
      {identity ? (
        <>
          <Card className="border-border/40 bg-card">
            <CardHeader className="flex flex-row items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-accent/10 p-3">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-foreground">Your Digital Identity</CardTitle>
                  <p className="text-sm text-muted-foreground">Verifiable on Cardano</p>
                </div>
              </div>
              <Badge className="bg-accent/20 text-accent">Score: {identity.verificationScore}%</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">DID URI</label>
                <div className="flex items-center gap-2 mt-2 p-3 rounded-lg bg-background/50 border border-border/20">
                  <code className="text-sm text-accent flex-1 break-all">{identity.didUri}</code>
                  <button
                    onClick={() => copyToClipboard(identity.didUri)}
                    className="p-2 hover:bg-background/50 rounded transition-colors"
                  >
                    <Copy className="h-4 w-4 text-muted-foreground hover:text-accent" />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Public Key</label>
                <div className="flex items-center gap-2 mt-2 p-3 rounded-lg bg-background/50 border border-border/20">
                  <code className="text-sm text-accent flex-1 break-all font-mono">
                    {identity.publicKey.substring(0, 32)}...
                  </code>
                  <button
                    onClick={() => copyToClipboard(identity.publicKey)}
                    className="p-2 hover:bg-background/50 rounded transition-colors"
                  >
                    <Copy className="h-4 w-4 text-muted-foreground hover:text-accent" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-lg bg-background/50 border border-border/20 text-center">
                  <div className="text-2xl font-bold text-accent">{credentialCount}</div>
                  <div className="text-xs text-muted-foreground">Total Credentials</div>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border/20 text-center">
                  <div className="text-2xl font-bold text-accent">{verifiedCount}</div>
                  <div className="text-xs text-muted-foreground">Verified</div>
                </div>
              </div>

              <div className="pt-4 flex gap-2">
                <Link href="/citizen/did" className="flex-1">
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    Manage Identity
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="border-border/40 bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">No Digital Identity Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Create your digital identity to start verifying credentials on the blockchain.
            </p>
            <Link href="/citizen/did">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Create DID</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
