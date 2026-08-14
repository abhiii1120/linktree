import z from "zod";

export const createLinkSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    url: z.string().url("Must be valid url"),
  }),
});
