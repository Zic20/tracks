import Cookies from "cookies";

async function handler(req, res) {
  if (req.method === "PATCH") {
    const { projectid } = req.query;
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("access");
    const apiUrl = process.env.API_url;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${accessToken}`);

    const response = await fetch(`${apiUrl}/projects/${projectid}`, {
      method: "PATCH",
      headers,
      body: req.body,
    });

    if (!response.ok) {
      res.status(response.status).json(await response.json());
      return;
    }

    const responseData = await response.json();
    res.status(response.status).json(responseData);
  } else if (req.method === "GET") {
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;
