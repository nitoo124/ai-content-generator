import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../utils/dbConnect";
import Content from "../../../../utils/models/ContentModel";
import { currentUser } from "@clerk/nextjs/server";



export async function GET(req: Request) {
  try {
    await dbConnect();

    // Get the current user from Clerk
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Use the user's primary email address
    const userEmail = user.emailAddresses[0]?.emailAddress;
    if (!userEmail) {
      return NextResponse.json({ error: 'User email not found' }, { status: 400 });
    }

    // Find all content entries for this user, sorted by newest first
    const userContent = await Content.find({ email: userEmail })
      .sort({ createdAt: -1 }) // -1 for descending (newest first)
      .exec();

    return NextResponse.json(userContent, { status: 200 });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Error fetching content history' },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await dbConnect();

    // Get the current user from Clerk
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Use the user's primary email address
    const userEmail = user.emailAddresses[0]?.emailAddress;
    if (!userEmail) {
      return NextResponse.json({ error: 'User email not found' }, { status: 400 });
    }

    const newEntry = new Content({
      formData: body.formData,
      aiOutput: body.aiOutput,
      templateSlug: body.templateSlug,
      email: userEmail,  // Add the email to the new entry
      createdAt: new Date()
    });

    await newEntry.save();

    return NextResponse.json({ message: 'Saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving to DB:', error);
    return NextResponse.json({ error: 'Error saving to DB' }, { status: 500 });
  }
}
export async function PUT(req: NextRequest) {
  try {
    const { id, aiOutput } = await req.json();
    await dbConnect();

    // Get the current user from Clerk
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Verify the content belongs to the user
    const content = await Content.findById(id);
    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    const userEmail = user.emailAddresses[0]?.emailAddress;
    if (content.email !== userEmail) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Update the content
    const updatedContent = await Content.findByIdAndUpdate(
      id,
      { aiOutput },
      { new: true }
    );

    return NextResponse.json(updatedContent, { status: 200 });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { error: 'Error updating content' },
      { status: 500 }
    );
  }
}