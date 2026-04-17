import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import dbConnect from "../../../../utils/dbConnect";
import Content from "../../../../utils/models/ContentModel";

export async function GET() {
  try {
    await dbConnect();

    // Clerk user
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const userEmail = user.emailAddresses?.[0]?.emailAddress;

    if (!userEmail) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    // Fetch user content
    const data = await Content.find({ email: userEmail })
      .sort({ createdAt: -1 });

    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("GET CONTENT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}