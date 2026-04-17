import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../utils/dbConnect";
import { currentUser } from "@clerk/nextjs/server";
import Content from "../../../../../utils/models/ContentModel";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = user.emailAddresses[0]?.emailAddress;

    // ✅ FIX HERE
    const { id } = await context.params;

    const { aiOutput } = await req.json();

    const content = await Content.findById(id);

    if (!content || content.email !== email) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await Content.findByIdAndUpdate(
      id,
      { aiOutput },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "PUT failed" }, { status: 500 });
  }
}