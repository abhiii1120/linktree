import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    username: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().email("A valid email is required"),
    password: z.string().min(5, "Password must be at least 6 characters"),
  }),
});

export const loginSchema = z.object({
  body:z.object({
    email:z.string().trim().email("A valid email is required"),
    password:z.string().min(5,"Password must be at least 6 characters"),
  })
})