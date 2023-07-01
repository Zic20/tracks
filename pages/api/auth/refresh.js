import Cookies from "cookies";
async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const result = await fetch(`http://127.0.0.1/tracks/refresh.php`, {
    method: "POST",
    headers: headers,
    body: userData,
  });
  if (!result.ok) {
    res.status(result.status).json({ message: result.statusText });
    return;
  }

  const cookies = new Cookies(req, res);
  const cookieData = result.headers.getSetCookie();
  const accessToken = cookieData[0].toString().split("=")[1];
  const refreshToken = cookieData[1].toString().split("=")[1];

  cookies.set("access", accessToken);
  cookies.set("refresh", refreshToken);
  const responseData = await result.json();
  res.status(result.status).json(responseData);
}

export default handler;
