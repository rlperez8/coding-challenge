import { sql } from "@vercel/postgres";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, current_attendees, isRegisterd } = body;

    const result = await sql`
      UPDATE coding_challenge.conferences
      SET
        current_attendees = ${current_attendees},
        registerd = ${isRegisterd}
      WHERE id = ${id}
      RETURNING *;
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
