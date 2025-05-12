import { NextResponse } from "next/server";

async function POST(request: Request) {
  console.log("calendar event received successfully: \n");

  console.log(request);

  return NextResponse.json({ message: "Calendar event received successfully" });
}

export { POST };
