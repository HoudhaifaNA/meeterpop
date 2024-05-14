import { z } from "zod";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("Please, enter a valid email"),
});

export default loginFormSchema;
