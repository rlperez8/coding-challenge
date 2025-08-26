import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";


export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, description, date, location, price, max_attendees, current_attendees, category, imageurl, speakerID } = body;

    // Update row
    const result = await sql`
      UPDATE coding_challenge.conferences
      SET
        name = ${name},
        description = ${description},
        date = ${date},
        location = ${location},
        price = ${price},
        max_attendees = ${max_attendees},
        current_attendees = ${current_attendees},
        category = ${category},
        imageurl = ${imageurl},
        speaker = ${speakerID}
      WHERE id = ${id}
      RETURNING *;  -- ✅ return the updated row
    `;

    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Update failed" }), { status: 500 });
  }
}