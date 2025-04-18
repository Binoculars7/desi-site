import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext"; // adjust path

const DiscordCallback = () => {
  const location = useLocation();
  const { userData, setUserData } = useUser();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    const exchangeCodeForToken = async () => {
      const clientId = "1362531918414872776";
      const clientSecret = "0HTdL5L0v4Wz6TZH4Wr_R8RGZ03z5ABZ";
      const redirectUri = "http://localhost:5173/";

      const body = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        scope: "identify email",
      });

      try {
        const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        });

        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        if (accessToken) {
          const userRes = await fetch("https://discord.com/api/users/@me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const userInfo = await userRes.json();
          setUserData(userInfo); // 🔥 Save to global state
        }
      } catch (error) {
        console.error("Discord auth error:", error);
      }
    };

    if (code) {
      exchangeCodeForToken();
    }
  }, [location, setUserData]);

  return (
    <div className="text-white p-4">
      <h2 className="text-xl font-bold">Discord Login</h2>
      {userData ? (
        <div className="mt-4">
          <p>Welcome, {userData.username}#{userData.discriminator}</p>
          <p>Email: {userData.email}</p>
          <img
            src={`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`}
            alt="Avatar"
            className="w-20 h-20 rounded-full mt-2"
          />
        </div>
      ) : (
        <p>Fetching user data...</p>
      )}
    </div>
  );
};

export default DiscordCallback;
