import { NextRequest, NextResponse } from "next/server";
import {
  initializeApp,
  getApps,
  cert,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Only initialize once in serverless environments
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    } as ServiceAccount),
  });
}

const db = getFirestore();

export async function POST(request: NextRequest) {
  try {
    const { email, ...rest } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    console.log("firestorepayload", email, rest);

    // Write to Firestore: collection "waitlist", doc id = email
    await db
      .collection("waitlist")
      .doc(email)
      .set({
        email,
        ...rest,
        createdAt: new Date().toISOString(),
      });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
