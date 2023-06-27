import { headers } from "next/dist/client/components/headers";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const headers = new Headers();
    headers.append("Content-type", "application/json");
    const result = await fetch("http://localhost/tracksapi/login.php", {
      method: "POST",
      headers,
      body: data,
    });

    const responseData = await result.json();

    res.status(result.status).json(responseData);
  }
}

export default handler;
