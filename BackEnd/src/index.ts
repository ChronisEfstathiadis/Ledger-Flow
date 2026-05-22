import express from "express";
import { auth } from "express-openid-connect";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes/users";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  baseURL: process.env.BACKEND_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,

  routes: {
    login: false as string | false | undefined,
    logout: false as string | false | undefined,
  },

  authorizationParams: {
    response_type: "code",
    response_mode: "query",
    scope: "openid profile email",
    audience: process.env.AUTH0_AUDIENCE,
  },

  session: {
    cookie: {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    },
  },
};

app.use(auth(config));

app.get("/login", (req, res) => {
  res.oidc.login({
    returnTo: `${process.env.FRONTEND_URL}/app/home`,
  });
});

app.get("/logout", (req, res) => {
  res.oidc.logout({
    returnTo: process.env.FRONTEND_URL || "http://localhost:5173",
  });
});

app.use("/api/users", usersRouter);
app.get("/", (req, res) => {
  res.redirect(process.env.FRONTEND_URL || "http://localhost:5173");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
