import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function GET() {
  try {
    console.log(`[Frontend API] Fetching users from: ${API_URL}/api/users`);

    const response = await fetch(`${API_URL}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(
        `[Frontend API] Server responded with status ${response.status}:`,
        errorData
      );
      throw new Error(`Server responded with status ${response.status}`);
    }

    const users = await response.json();
    console.log("[Frontend API] Users fetched successfully:", users);
    return NextResponse.json(users);
  } catch (error) {
    console.error("[Frontend API] Error fetching users:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch users",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
