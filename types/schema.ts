import { z } from "zod";

export const SignUpSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name must be less than 50 characters"),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, "Password must be at least 6 characters")
    .max(16, "Password must be less than 50 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number"
    ),

  tc: z
    .string()
    .min(1, { message: "TC is required" })
    .regex(/^\d{11}$/, { message: "TC must be 11 digits" }),
});
