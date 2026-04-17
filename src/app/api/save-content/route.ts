// app/api/save-content/route.ts
import { NextRequest, NextResponse } from "next/server";
import Content from "../../../../utils/models/ContentModel";
import { currentUser } from "@clerk/nextjs/server";
import dbConnect from "../../../../utils/dbConnect";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    console.log("=== STARTING POST REQUEST ===");
    
    const body = await req.json();
    console.log("Received body:", JSON.stringify(body, null, 2));

    // Get the current user from Clerk
    const user = await currentUser();
    if (!user) {
      console.log("No user found");
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Use the user's primary email address
    const userEmail = user.emailAddresses[0]?.emailAddress;
    if (!userEmail) {
      console.log("No email found");
      return NextResponse.json({ error: 'User email not found' }, { status: 400 });
    }
    
    console.log("User email:", userEmail);

    // Check if unique index exists and drop it
    try {
      const indexes = await Content.collection.getIndexes();
      console.log("Current indexes:", Object.keys(indexes));
      
      if (indexes.email_1) {
        console.log("Dropping unique email_1 index...");
        await Content.collection.dropIndex("email_1");
        console.log("✅ Successfully dropped email_1 index");
      }
    } catch (indexError) {
      console.log("Index check error:", indexError);
    }

    // Create new entry
    const newEntry = new Content({
      formData: body.formData,
      aiOutput: body.aiOutput,
      templateSlug: body.templateSlug,
      email: userEmail,
      createdAt: new Date()
    });

    console.log("Attempting to save entry...");
    await newEntry.save();
    console.log("✅ Successfully saved entry with ID:", newEntry._id);

    return NextResponse.json({ 
      message: 'Saved successfully',
      id: newEntry._id 
    }, { status: 200 });
    
  } catch (error: any) {
    console.error("❌ Detailed error:", error);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Error response:", error.errorResponse);
    
    return NextResponse.json(
      { 
        error: 'Error saving to DB', 
        details: error.message,
        code: error.code 
      },
      { status: 500 }
    );
  }
}