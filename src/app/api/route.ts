import { sql } from "@vercel/postgres";
import { mockConferences } from "@/data/mockConference";
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
    } = body

    console.log('Body In Route',body)
    await sql`
    INSERT INTO coding_challenge.conferences (
    id,name,description,date,location,price,current_attendees,max_attendees,category,imageurl)
    VALUES (
    ${uuidv4()},${name},${description},${date},${location},${price},${current_attendees},${max_attendees},${category},${imageurl});`
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
  try {
    const result = await sql`SELECT * FROM coding_challenge.conferences`;
    return new Response(JSON.stringify({ conferences: result.rows }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to fetch conferences:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch conferences" }), { status: 500 });
  }
}