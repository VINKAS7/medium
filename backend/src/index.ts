import { Hono } from 'hono'
import {userRouter} from "./routes/userRouter";
import {blogRouter} from "./routes/blogRouter";
const app = new Hono  ()
app.route("/api/v1/user",userRouter);
app.route("api/v1/blog",blogRouter);
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
export default app