import { Hono } from 'hono'
import user from './routes/user';
import blog from "./routes/blog";
import { verify } from 'hono/jwt';
import { SignInInput, UpdatePostInput, CreatePostInput, SignUpInput  } from '@manasth_soni/common-medium-app';
import { cors } from 'hono/cors';

const app = new Hono<{Bindings: {DATABASE_URL: string, JWT_SECRET: string}}>();

app.use("/*", cors());


app.route("/api/v1/user", user);
app.route("/api/v1/blog", blog);

export default app
