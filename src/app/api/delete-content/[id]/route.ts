import { NextResponse } from "next/server";
import dbConnect from "../../../../../utils/dbConnect";
import { currentUser } from "@clerk/nextjs/server";
import Content from "../../../../../utils/models/ContentModel";

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { 
        status: 401,
        headers: corsHeaders
      });
    }

    const email = user.emailAddresses[0]?.emailAddress;
    const {id }= await params;

    const deleted = await Content.findOneAndDelete({
      _id:id,
      email
    });

    if (!deleted) {
      return NextResponse.json({ error: "Forbidden" }, { 
        status: 403,
        headers: corsHeaders
      });
    }

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "DELETE failed" }, { 
      status: 500,
      headers: corsHeaders
    });
  }
}