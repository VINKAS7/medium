import {Hono} from 'hono';
import {PrismaClient} from "@prisma/client/edge";
import {withAccelerate} from "@prisma/extension-accelerate";
import {verify} from "hono/jwt";
import {cors} from "hono/cors"

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        jwt_secret:string
    },
    Variables:{
        authorId:string
    }
}>();
blogRouter.use("/*",cors())
blogRouter.use("/*",async (c,next) => {
    const authHeader = c.req.header('Authorization') || "";
    const user = await verify(authHeader,c.env.jwt_secret) || "";
    if(user){
        // @ts-ignore
        c.set("authorId",user.id);
    }
    else{
        return c.json({
            message: "You are not Logged in",
        })
    }
    await next();
})

blogRouter.post("/",async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try{
        await prisma.blog.create({
            data:{
                title: body.title,
                content: body.content,
                authorId:Number(c.get("authorId")),
                date_time: new Date().toISOString(),
            }
        })
        return c.json({
            message:"Yes"
        })
    }
    catch(e){
        return c.json({
            message:"Something went wrong",
        })
    }
});

blogRouter.put("/update_blog",async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const body = await c.req.json();
    try{
        await prisma.blog.update({
            where:{
                id: body.id,
            },
            data:{
                title: body.title,
                content: body.content
            }
        })
        return c.text("Blog saved")
    }
    catch(e){
        c.status(411);
        return c.text("Something went wrong")
    }
});

blogRouter.get("/my_blogs",async (c) => {
    const id = Number(c.get("authorId"))
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    try{
        const id_blogs = await prisma.blog.findMany({
            where:{
                id:id
            },
        })
        return c.json({
            id_blogs
        })
    }
    catch(e){
        c.status(411);
        return c.json({
            message: "Blogs not found."
        });
    }
})

blogRouter.get("/bulk",async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try{
        const blogs = await prisma.blog.findMany({
            select:{
                title:true,
                content:true,
                date_time:true,
                authorId:true,
                id:true,
                author:{
                    select:{
                        username:true
                    }
                }
            }
        });
        return c.json({
            blogs
        });
    }
    catch(e){
        c.status(411);
        console.log(e);
        return c.json({
            message: "Error while fetching all blogs"
        });
    }
});

blogRouter.get("/:id",async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const id = c.req.param("id");
    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id: Number(id),
            },
            select:{
                title:true,
                content:true,
                date_time:true,
                id:true,
                author:{
                        select:{username:true
                        }
                    }
            }
        });
        return c.json({
            blog
        })
    }
    catch(e){
        c.status(411);
        return c.json({
            message: "Error while fetching blog"
        });
    }
});

blogRouter.delete("/:id",async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const blog_id = c.req.param("id")
    try{
        await prisma.blog.delete({
            where:{
                id: Number(blog_id),
            }
        });
        return c.json({
            message:"Deleted blog"
        })
    }
    catch(e){
        c.status(411);
        return c.json({
            message:"Error while deleting blog"
        })
    }
})