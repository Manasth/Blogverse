import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import {verify} from "hono/jwt"

import { createPostInput, updatePostInput } from '@manasth_soni/common-medium-app';


const blog = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }, 
    Variables: {
        userId: string
    }
}>()


blog.use("/*" ,async(c, next) => {
    const jwt = c.req.header("Authorization");
    if(!jwt) {
      c.status(401);
      return c.json({error: "unauthorized"});
    }
    const token = jwt.split(" ")[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    if(!payload){
      c.status(401);
      return c.json({error: "unauthorized"});
    }
    c.set("userId", payload.id as string);
    await next();
  })
  


blog.post("/", async (c) => {
    const body = await c.req.json();
    const {success} = createPostInput.safeParse(body);
    if(!success) {
        c.status(403);
        return c.json({"message": "Invalid Inputs"});
    }
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const post = await prisma.post.create({data:
            {
            title: body.title,
            content: body.content,
            authorId: userId
            }
        })
        return c.json({"id": post.id, "userId": userId});
    } catch (error){
        c.status(411)
        return c.json({error})
    }
})

blog.put("/", async (c) => {
    const body = await c.req.json();
    const {success} = updatePostInput.safeParse(body);
      if(!success) {
        c.status(403);
        return c.json({"message": "Invalid Inputs"});
      }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        });
        return c.json({"blog": blog});
    } catch(error) {
        c.status(411);
        return c.json({error});
    }
})

blog.get("/bulk", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const blogs = await prisma.post.findMany({
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json({"posts": blogs})
    } catch(error) {
        c.status(411);
        return c.json({error});
    }
})

blog.post("/delete/:id", async (c) => {
    const {id} = c.req.param();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
        await prisma.post.delete({where: {
            id: id
        }})
        return c.text("deleted");
    } catch(error) {
        c.status(411);
        return c.json({
            message: "Error while deleting blog post"
        });
    }
})


blog.get("/:id", async (c) => {
    const {id} = c.req.param();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({"post": blog})
    } catch(error) {
        c.status(411);
        return c.json({
            message: "Error while fetching blog post"
        });
    }
})


export default blog;