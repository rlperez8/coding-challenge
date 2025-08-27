import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";

// Helper to log errors consistently
function logError(context: string, err: any) {
  console.error(`[${context}]`, err);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      description,
      date,
      location,
      price,
      max_attendees,
      current_attendees,
      category,
      imageurl,
      speaker,
    } = body;

    // Basic validation
    if (!name || !date) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name or date" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Body In Route:", body);

    await sql`
      INSERT INTO coding_challenge.conferences (
        id, name, description, date, location, price, current_attendees, max_attendees, category, imageurl, speaker
      )
      VALUES (
        ${uuidv4()}, ${name}, ${description}, ${date}, ${location}, ${price}, ${current_attendees}, ${max_attendees}, ${category}, ${imageurl}, ${speaker}
      );
    `;

    return new Response(
      JSON.stringify({ message: "Conference added successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    logError("POST /api/conferences", err);
    return new Response(
      JSON.stringify({ error: "Insert failed", details: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ error: "Missing id" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("Incoming ID:", id);

    const result = await sql`
      DELETE FROM coding_challenge.conferences
      WHERE id = ${id}
      RETURNING *;
    `;

    return new Response(
      JSON.stringify({ message: "Deleted successfully", data: result.rows[0] }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    logError("DELETE /api/conferences", err);
    return new Response(
      JSON.stringify({ error: "Failed to delete conference", details: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  try {
    const conferencesResult = await sql`SELECT * FROM coding_challenge.conferences`;
    const speakersResult = await sql`SELECT * FROM coding_challenge.speakers`;

    return new Response(
      JSON.stringify({
        conferences: conferencesResult.rows,
        speakers: speakersResult.rows,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    logError("GET /api/conferences", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch data", details: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
