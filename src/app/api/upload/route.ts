import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename to prevent duplicates
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const fileExtension = path.extname(file.name) || ".jpg";
    const filename = `${uniqueId}${fileExtension}`;

    // Define target directory in the workspace public folder
    const publicDirectory = path.join(process.cwd(), "public", "uploads");

    // Ensure the directory exists
    await mkdir(publicDirectory, { recursive: true });

    // Write file to filesystem
    const filePath = path.join(publicDirectory, filename);
    await writeFile(filePath, new Uint8Array(buffer));

    // Return the publicly accessible URL
    const fileUrl = `/uploads/${filename}`;
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Local upload error:", error);
    return NextResponse.json({ error: "Failed to upload file locally" }, { status: 500 });
  }
}
