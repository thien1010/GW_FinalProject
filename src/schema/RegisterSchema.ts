import { z } from "zod";

export const RegisterSchema = z.object({
  fullname: z.string().min(5, { message: "Please enter your fullname" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
