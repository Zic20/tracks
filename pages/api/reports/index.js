import Cookies from "cookies";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const cookies = new Cookies(req, res);
  const accessToken = cookies.get("access");
  const apiUrl = process.env.API_url;
  const data = req.body;
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${accessToken}`);
  if (!data) {
    res.status(400).json({ message: "Request body not found" });
    return;
  }

  const response = await fetch(`${apiUrl}/reports`, {
    method: "POST",
    headers,
    body: data,
  });

  const responseData = await response.json();
  if (!response.ok) {
    res.status(response.status).json({
      message: responseData.message || response.statusText,
    });
    return;
  }

  res.status(response.status).json(responseData);
}
