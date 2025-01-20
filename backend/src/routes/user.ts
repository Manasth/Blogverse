import { Hono } from "hono";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {decode, sign} from "hono/jwt"

import { signUpInput, signInInput  } from '@manasth_soni/common-medium-app';
import { verify } from "hono/jwt";


const user = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();


user.get("/check" ,async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
    const jwt = c.req.header("Authorization");
    const token = jwt!.split(" ")[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    if(payload && jwt){
      const user = await prisma.user.findFirst({where: {id: `${payload.id}`}, select: {
        email: true,
        name: true,
        id: false,
        password: false
      }})
      return c.json({"message": "success", "user": user})
    }
    return c.json({"message": "error"})
  })

user.post("/signup", async (c) => {
  const body = await c.req.json();
  const {success} = signUpInput.safeParse(body);
  if(!success) {
    c.status(403);
    return c.json({"message": "Invalid Inputs"});
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  try{
    console.log(body);
    const user = await prisma.user.create({data: {
      email: body.email,
      password: body.password
    }});
    const token = await sign({id: user?.id}, c.env.JWT_SECRET);
    return c.json({jwt: token});
  }catch(error) {
    c.status(411)
    return c.text("Invalid")
  }
})

user.post("/signin", async (c) => {
  const body = await c.req.json();
  const {success} = signInInput.safeParse(body);
  if(!success) {
    c.status(403);
    return c.json({"message": "Invalid Inputs"});
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try{
    const user = await prisma.user.findFirst({where: {
      email: body.email,
      password: body.password
    }})
    if(!user){
      c.status(403);
      return c.json({"error": "user not found"});
    }
    const token = await sign({id: user?.id}, c.env.JWT_SECRET);
    return c.json({jwt: token});
  } catch(error) {
    c.status(411)
    return c.text("Invalid")
  }
})

export default user;