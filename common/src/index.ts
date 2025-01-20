import zod from "zod";

export const signUpInput = zod.object(
    {
        email: zod.string().email(),
        password: zod.string(),
        name: zod.string().optional()
    }
)

export type SignUpInput = zod.infer<typeof signUpInput>;

export const signInInput = zod.object(
    {
        email: zod.string().email(),
        password: zod.string()
    }
)

export type SignInInput = zod.infer<typeof signInInput>;

export const createPostInput = zod.object({
    title: zod.string(),
    content: zod.string()
})

export type CreatePostInput = zod.infer<typeof createPostInput>;

export const updatePostInput = zod.object({
    title: zod.string().optional(),
    content: zod.string().optional()
})

export type UpdatePostInput = zod.infer<typeof updatePostInput>;