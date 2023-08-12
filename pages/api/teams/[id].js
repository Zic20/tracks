import Cookies from "cookies";

async function handler(req, res) {
  const apiUrl = process.env.API_URL;
  if (req.method === "PATCH") {
    const { id } = req.query;
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("access");

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${accessToken}`);

    const response = await fetch(`${apiUrl}/teams/${id}`, {
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
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("access");

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${accessToken}`);

    const response = await fetch(`${apiUrl}/teams/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      res.status(response.status).json(await response.json());
      return;
    }

    const responseData = await response.json();
    res.status(response.status).json(responseData);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;
