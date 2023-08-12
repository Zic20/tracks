import Cookies from "cookies";

export default async function handler(req, res) {
  const apiUrl = process.env.API_URL;
  if (req.method === "PATCH") {
    const { taskid } = req.query;
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("access");

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${accessToken}`);

    const response = await fetch(
      `${apiUrl}/projectstasks/${taskid}`,
      {
        method: "PATCH",
        headers,
        body: req.body,
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      res.status(response.status).json({ message: "Something went wrong" });
      return;
    }

    res.status(response.status).json(responseData);
  } else if (req.method === "DELETE") {
    const { taskid } = req.query;
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("access");

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${accessToken}`);

    const response = await fetch(
      `${apiUrl}/projectstasks/${taskid}`,
      {
        method: "DELETE",
        headers,
      }
    );

    if (!response.ok) {
      res.status(response.status).json({ message: "Something went wrong" });
      return;
    }

    const responseData = await response.json();
    res.status(response.status).json(responseData);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
