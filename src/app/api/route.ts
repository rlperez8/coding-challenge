import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  
  try{
    const body = await req.json()
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
    } = body

    console.log('Body In Route',body)
    await sql`
    INSERT INTO coding_challenge.conferences (
    id,name,description,date,location,price,current_attendees,max_attendees,category,imageurl,speaker)
    VALUES (
    ${uuidv4()},${name},${description},${date},${location},${price},${current_attendees},${max_attendees},${category},${imageurl},${speaker});`
    return Response.json({ message: "Conference added successfully!" });
  }
  catch (err) {
    console.error("Insert failed:", err);
    return Response.json({ error: "Insert failed" }, { status: 500 });
}
}
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body; 
    console.log('Incoming ID:', id);

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
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to delete conference" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
export async function GET() {
  console.log('hello')
  console.log (process.env.DATABASE_URL || "undefined")
  console.log (process.env.POSTGRES_URL || "undefined")
  console.log (process.env.NODE_ENV || "undefined")

  try {
    // Fetch conferences
    const conferencesResult = await sql`SELECT * FROM coding_challenge.conferences`;

    // Fetch speakers
    const speakersResult = await sql`SELECT * FROM coding_challenge.speakers`;

    return new Response(
      JSON.stringify({
        conferences: conferencesResult.rows,
        speakers: speakersResult.rows,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Failed to fetch data:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch data" }),
      { status: 500 }
    );
  }
}