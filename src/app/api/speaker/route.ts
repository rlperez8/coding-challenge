import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { speakerName, title, company, bio, imageurl } = body;

    console.log("Body In Route", body);

    // Optional: validate required fields
    if (!speakerName || !title || !company || !bio || !imageurl) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO coding_challenge.speakers (
        id, name, title, company, bio, avatar_url
      ) VALUES (
        ${uuidv4()}, ${speakerName}, ${title}, ${company}, ${bio}, ${imageurl}
      )
    `;

    return new Response(
      JSON.stringify({ message: "Conference added successfully!" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Insert failed:", err);
    return new Response(JSON.stringify({ error: "Insert failed" }), {
      status: 500,
    });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { speakerID, speakerName, title, company, bio, imageurl } = body;

  

    if (!speakerID || !speakerName || !title || !company || !bio || !imageurl) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const result = await sql`
      UPDATE coding_challenge.speakers
      SET 
        name = ${speakerName},
        title = ${title},
        company = ${company},
        bio = ${bio},
        avatar_url = ${imageurl}
      WHERE id = ${speakerID}
      RETURNING *;
    `;

    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Update failed" }), {
      status: 500,
    });
  }
}
