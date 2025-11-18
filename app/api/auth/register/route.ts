import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, password, role } = await request.json()

    if (!fullName || !email || !password || !role) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 })
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const user = {
      id: Date.now().toString(),
      fullName,
      email,
      role,
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
