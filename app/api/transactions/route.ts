import { type NextRequest, NextResponse } from "next/server";
import { BlockfrostProvider, MeshWallet, Transaction } from '@meshsdk/core';
import { PrismaClient } from '@prisma/client';

// 1. Setup Prisma Client (Database)
// Use a global variable to prevent too many connections during hot-reloads
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// 2. Mock Data Fallback (Keeps your dashboard working if DB is offline)
const MOCK_TRANSACTIONS = [
  {
    id: "mock-1",
    type: "payment",
    description: "Civic License Renewal (Mock)",
    amount: "₦ 5,000",
    date: new Date("2025-11-08"),
    status: "completed",
    txHash: "0x1a2b...3c4d",
  },
  {
    id: "mock-2",
    type: "refund",
    description: "Tax Overpayment Refund (Mock)",
    amount: "₦ 2,500",
    date: new Date("2025-11-05"),
    status: "completed",
    txHash: "0x5e6f...7g8h",
  },
];

//  GET: Fetch Transaction History 
export async function GET(request: NextRequest) {
  try {
    // A. Try to fetch from Real Database
    const transactions = await prisma.transaction.findMany({
      orderBy: { date: 'desc' },
      // Optional: If you had authentication, you'd filter by userId here
    });

    // If database is empty (or new), show mocks so the UI isn't blank
    if (transactions.length === 0) {
      return NextResponse.json(MOCK_TRANSACTIONS);
    }

    return NextResponse.json(transactions);

  } catch (error) {
    console.warn("Database fetch failed, falling back to mocks:", error);
    // B. Fallback: If Database connection fails, return mocks (Safety Net)
    return NextResponse.json(MOCK_TRANSACTIONS);
  }
}

// Create New Payment (Blockchain + DB) 
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, description, paymentType, userId } = body;

    let txHash = "";

    // A. BLOCKCHAIN LAYER (Cardano)
    if (process.env.BLOCKFROST_API_KEY && process.env.WALLET_MNEMONIC) {
      console.log("--- Connecting to Cardano Blockchain ---");
      try {
        const provider = new BlockfrostProvider(process.env.BLOCKFROST_API_KEY);
        const wallet = new MeshWallet({
          networkId: 0, // 0 = Preprod (Testnet), 1 = Mainnet
          fetcher: provider,
          submitter: provider,
          key: {
            type: 'mnemonic',
            words: process.env.WALLET_MNEMONIC.split(' '),
          },
        });

        const myAddress = await wallet.getChangeAddress();
        
        
        const receiptMetadata = {
          "msg": [
            "CivicChain Payment",
            `Type: ${paymentType || 'General'}`,
            `Desc: ${description.substring(0, 40)}` 
          ],
          "amt": amount,
          "ts": Date.now().toString()
        };

        // Create Transaction: Send 1.5 ADA to self (Dummy Payment) + Metadata. We're building mvp, so no need for real payment.
        const tx = new Transaction({ initiator: wallet })
          .sendLovelace(myAddress, '1500000') 
          .setMetadata(674, receiptMetadata);

        const unsignedTx = await tx.build();
        const signedTx = await wallet.signTx(unsignedTx);
        txHash = await wallet.submitTx(signedTx);
        
        console.log(`--- Blockchain Success: ${txHash} ---`);

      } catch (chainError: any) {
        console.error("Blockchain Error:", chainError);
        throw new Error("Blockchain transaction failed: " + chainError.message);
      }
    } else {
      console.warn("Skipping Blockchain: Missing .env keys. Using Mock Hash.");
      txHash = `0xSimulated${Math.random().toString(16).slice(2, 10)}`;
    }

    // B. DATABASE LAYER (PostgreSQL)
    let newTransaction;
    try {
      // Create the record in Postgres
      newTransaction = await prisma.transaction.create({
        data: {
          amount: amount,
          description: description,
          type: "payment",
          status: "completed",
          txHash: txHash, // <--- The Real Proof!
          // If no userId provided (guest), use a placeholder or handle gracefully. we might not get to implement cardano fully into our mvp.
          userId: userId || "guest-user", 
        },
      });
    } catch (dbError) {
      console.warn("Database save failed (Table might not exist yet). Returning ephemeral object.");
      
      // Fallback object to return to frontend immediately incase
      newTransaction = {
        id: Date.now().toString(),
        amount,
        description,
        type: "payment",
        status: "completed",
        txHash,
        date: new Date(),
        userId: userId || "guest",
      };
    }

    return NextResponse.json(newTransaction);

  } catch (error: any) {
    console.error("Transaction API Failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process transaction" }, 
      { status: 500 }
    );
  }
}