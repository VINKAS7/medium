import {Hono} from "hono"
import {PrismaClient} from "@prisma/client/edge";
import {withAccelerate} from "@prisma/extension-accelerate";
import {sign} from "hono/jwt"
import {signupInput} from "@vinkas777/medium-common";
import {cors} from "hono/cors"
export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        jwt_secret:string
    }
}>();
userRouter.use("/*",cors())
userRouter.post("/signup",async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const username = body.username
    const email = body.email
    const password = body.password
    const {success} = signupInput.safeParse({username,email,password});
    if(!success){
        return c.json(
            {
                message:"Validation is not successfully"
            });
    }
    try{
        const user = await prisma.user.create({
            data:{
                username: body.username,
                email: body.email,
                password: body.password
            }
        });
        const token = await sign({
            id: user.id,
        },c.env.jwt_secret);
        return c.json({
            message:"Yes",
            token:token
        });
    }
    catch(e){
        c.status(411);
        return c.json({
            message:"Username or Email already exists",
        })
    }
});

userRouter.post("/login",async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try{
        const user = await prisma.user.findFirst({
            where:{
                username: body.username,
                password: body.password
            }
        });
        if(!user){
            c.status(403);
            return c.json({
                message: "Invalid Credentials!"
            })
        }
        const token = await sign({
            id: user.id,
        },c.env.jwt_secret);
        return c.json({
            message: "Yes",
            token: token
        });
    }
    catch(e){
        c.status(411);
        return c.json({
            message: "Invalid Credentials!"
        })
    }
});

userRouter.get("/get_users",async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try{
        const users  = await prisma.user.findMany();
        return c.json({
            users: users
        })
    }
    catch(err){
        c.status(403);
        return c.json({
            message:"Invalid Credentials!"
        })
    }
});