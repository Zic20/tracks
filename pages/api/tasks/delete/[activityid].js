import Cookies from "cookies";

async function handler(req, res) {
  if (req.method === "DELETE") {
    const { activityid } = req.query;
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("access");
    const apiUrl = process.env.API_URL;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${accessToken}`);

    const response = await fetch(`${apiUrl}/activities/${activityid}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      res.status(response.status).json({ message: "Something went wrong" });
      return;
    }

    const requestClone = response.clone();
    const responseData = await requestClone.json();
    res.status(response.status).json(responseData);
    return;
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;
