"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore, useDidStore, type DigitalIdentity, type DidCredential } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Plus, Check, Clock, AlertCircle, Trash2, Eye } from "lucide-react"

const mockCredentials: DidCredential[] = [
  {
    id: "1",
    type: "identity",
    name: "National ID Verification",
    issuer: "Government Authority",
    issuedDate: "2024-01-15",
    expiryDate: "2026-01-15",
    verified: true,
    hash: "0x1a2b3c4d5e6f7g8h",
  },
  {
    id: "2",
    type: "address",
    name: "Address Proof",
    issuer: "Local Authority",
    issuedDate: "2024-06-20",
    expiryDate: "2025-06-20",
    verified: true,
    hash: "0x8h7g6f5e4d3c2b1a",
  },
  {
    id: "3",
    type: "tax",
    name: "Tax Registration",
    issuer: "Tax Authority",
    issuedDate: "2024-03-10",
    verified: false,
    hash: "0x9i8h7g6f5e4d3c2b",
  },
  {
    id: "4",
    type: "employment",
    name: "Employment Certificate",
    issuer: "Current Employer",
    issuedDate: "2024-07-01",
    expiryDate: "2025-07-01",
    verified: true,
    hash: "0x5e4d3c2b1a9i8h7g",
  },
]

export default function DidPage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const identity = useDidStore((state) => state.identity)
  const setIdentity = useDidStore((state) => state.setIdentity)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!user || user.role !== "citizen") {
      router.push("/login")
      return
    }

    // Initialize DID if not already set
    if (!identity) {
      const mockDid: DigitalIdentity = {
        didUri: `did:prism:${Math.random().toString(36).substring(7)}`,
        publicKey: "0xpub" + Math.random().toString(36).substring(2, 66),
        credentials: mockCredentials,
        createdAt: new Date().toISOString(),
        verificationScore: 75,
      }
      setIdentity(mockDid)
    }
  }, [user, identity, setIdentity, router])

  if (!user) {
    return null
  }

  const getCredentialIcon = (type: string) => {
    switch (type) {
      case "identity":
        return "🆔"
      case "education":
        return "🎓"
      case "employment":
        return "💼"
      case "address":
        return "🏠"
      case "tax":
        return "📊"
      default:
        return "📄"
    }
  }

  const getStatusColor = (verified: boolean, type?: string) => {
    if (verified) {
      return "bg-accent/20 text-accent"
    }
    if (type === "tax") {
      return "bg-orange-500/20 text-orange-400"
    }
    return "bg-muted/50 text-muted-foreground"
  }

  const getStatusIcon = (verified: boolean) => {
    if (verified) {
      return <Check className="h-4 w-4" />
    }
    return <Clock className="h-4 w-4" />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Hide on dashboard page */}
      <style>{`
        .navbar, .footer { display: none; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-accent/10 p-3">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Digital Identity Management</h1>
              <p className="text-muted-foreground">Manage your verifiable credentials on Cardano blockchain</p>
            </div>
          </div>
        </div>

        {identity && (
          <>
            {/* Identity Overview */}
            <Card className="border-border/40 bg-card mb-8">
              <CardHeader>
                <CardTitle className="text-foreground">Your DID Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg bg-background/50 border border-border/20">
                    <div className="text-sm text-muted-foreground mb-2">DID URI</div>
                    <div className="text-sm font-mono text-accent break-all">{identity.didUri}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50 border border-border/20">
                    <div className="text-sm text-muted-foreground mb-2">Created</div>
                    <div className="text-sm text-foreground">{new Date(identity.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div className="p-4 rounded-lg bg-background/50 border border-border/20">
                    <div className="text-sm text-muted-foreground mb-2">Verification Score</div>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold text-accent">{identity.verificationScore}%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credentials */}
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="grid w-full grid-cols-4 bg-card border border-border/40">
                <TabsTrigger value="all" className="text-foreground data-[state=active]:bg-accent/10">
                  All ({identity.credentials.length})
                </TabsTrigger>
                <TabsTrigger value="verified" className="text-foreground data-[state=active]:bg-accent/10">
                  Verified ({identity.credentials.filter((c) => c.verified).length})
                </TabsTrigger>
                <TabsTrigger value="pending" className="text-foreground data-[state=active]:bg-accent/10">
                  Pending ({identity.credentials.filter((c) => !c.verified).length})
                </TabsTrigger>
                <TabsTrigger value="expired" className="text-foreground data-[state=active]:bg-accent/10">
                  Expired (0)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-6">
                {identity.credentials.length > 0 ? (
                  identity.credentials.map((credential) => (
                    <Card key={credential.id} className="border-border/40 bg-card hover:bg-card/80 transition-colors">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="text-3xl">{getCredentialIcon(credential.type)}</div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-foreground">{credential.name}</h3>
                                <Badge className={getStatusColor(credential.verified, credential.type)}>
                                  {credential.verified ? "Verified" : "Pending"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">Issuer: {credential.issuer}</p>
                              <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                  <span className="text-muted-foreground">Issued: </span>
                                  <span className="text-foreground">
                                    {new Date(credential.issuedDate).toLocaleDateString()}
                                  </span>
                                </div>
                                {credential.expiryDate && (
                                  <div>
                                    <span className="text-muted-foreground">Expires: </span>
                                    <span className="text-foreground">
                                      {new Date(credential.expiryDate).toLocaleDateString()}
                                    </span>
                                  </div>
                                )}
                                <div>
                                  <span className="text-muted-foreground">Hash: </span>
                                  <code className="text-accent font-mono">{credential.hash}</code>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-border/40 hover:bg-background/50 bg-transparent"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-border/40 hover:bg-destructive/10 hover:text-destructive bg-transparent"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="border-border/40 bg-card">
                    <CardContent className="pt-6 text-center">
                      <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No credentials yet</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="verified" className="space-y-4 mt-6">
                {identity.credentials
                  .filter((c) => c.verified)
                  .map((credential) => (
                    <Card key={credential.id} className="border-border/40 bg-card">
                      <CardContent className="pt-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Check className="h-5 w-5 text-accent" />
                          <div>
                            <p className="font-semibold text-foreground">{credential.name}</p>
                            <p className="text-sm text-muted-foreground">{credential.issuer}</p>
                          </div>
                        </div>
                        <Badge className="bg-accent/20 text-accent">Verified</Badge>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4 mt-6">
                {identity.credentials
                  .filter((c) => !c.verified)
                  .map((credential) => (
                    <Card key={credential.id} className="border-border/40 bg-card">
                      <CardContent className="pt-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-orange-400" />
                          <div>
                            <p className="font-semibold text-foreground">{credential.name}</p>
                            <p className="text-sm text-muted-foreground">{credential.issuer}</p>
                          </div>
                        </div>
                        <Badge className="bg-orange-500/20 text-orange-400">Pending</Badge>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="expired" className="space-y-4 mt-6">
                <Card className="border-border/40 bg-card">
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground">No expired credentials</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Add Credential */}
            <Card className="border-border/40 bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Add New Credential</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Request verification from authorized issuers to add new credentials to your digital identity.
                </p>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
                  <Plus className="h-4 w-4 mr-2" />
                  Request Credential
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
