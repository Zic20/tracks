export default async function handler(req, res) {
  const headers = new Headers();
  headers.append("Content-type", "application/json");
  if (req.method === "POST") {
    const result = await fetch(`${process.env.API_url}/reset.php`, {
      method: "POST",
      headers,
      body: req.body,
    });

    const responseData = await result.json();
    if (!result.ok) {
      res.status(result.status).json({ message: result.statusText });
      return;
    }

    res.status(result.status).json(responseData);
  } else {
    res.status(400).json({ message: "Wrong request method" });
  }
}
