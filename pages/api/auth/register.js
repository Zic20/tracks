import Cookies from "cookies";

async function handler(req, res) {
  if (req.method === "POST") {
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("access");
    const data = req.body;

    const apiUrl = process.env.API_url;

    const headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Authorization", `Bearer ${accessToken}`);
    const result = await fetch(`${apiUrl}/register.php`, {
      method: "POST",
      headers,
      body: data,
    });

    if (!result.ok) {
      res.status(result.status).json({ message: result.statusText });
      return;
    }

    const responseData = await result.json();
    res.status(result.status).json(responseData);
  }
}

export default handler;
