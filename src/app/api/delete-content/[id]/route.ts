import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../utils/dbConnect";
import Content from "../../../../../utils/models/ContentModel";

const corsHeaders = {
  "Access-Control-Allow-Origin":
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function DELETE(req: NextRequest, context: any) {
  try {
    await dbConnect(); // 🔥 IMPORTANT

    const { id } = await context.params; // ✅ FIX

    const deleted = await Content.findOneAndDelete({
      _id: id,
    });

    return NextResponse.json(
      { success: true, deleted },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.log("DELETE error:", error);
    return NextResponse.json(
      { success: false },
      { status: 500, headers: corsHeaders }
    );
  }
}