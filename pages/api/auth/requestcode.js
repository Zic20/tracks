export default async function handler(req, res) {
  if (req.method === "GET") {
    const headers = new Headers();
    headers.append("Content-type", "application/json");
    const result = await fetch(
      `${process.env.API_url}/reset.php?email=${req.query.email}`,
      {
        method: "GET",
        headers,
      }
    );
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
