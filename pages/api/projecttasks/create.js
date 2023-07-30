import Cookies from "cookies";

async function handler(req, res) {
  if (req.method === "POST") {
    const cookies = new Cookies(req, res);
    const accessToken = cookies.get("access");

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${accessToken}`);

    const response = await fetch("http://localhost/tracksapi/projectstasks", {
      method: "POST",
      mode: "no-cors",
      headers,
      body: req.body,
    });

    const responseData = await response.json();

    if (!response.ok) {
      res.status(response.status).json({
        message: responseData.message
          ? responseData.message
          : "Something went wrong",
      });
      return;
    }

    res.status(response.status).json(responseData);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;
