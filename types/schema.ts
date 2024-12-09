import { z } from "zod";

export const GENDER_OPTIONS = ["male", "female", "other"] as const;

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

export const UpdatePatientSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  nationalId: z
    .string()
    .length(11, "National ID must be exactly 11 digits")
    .regex(/^[1-9][0-9]{10}$/, "Invalid National ID format"),
  address: z
    .string()
    .min(3, "Address must be at least 3 characters")
    .max(50, "Address must be less than 50 characters"),
  gender: z.enum(GENDER_OPTIONS, {
    required_error: "Gender is required",
    invalid_type_error: `Invalid gender, must be one of the followings: ${GENDER_OPTIONS.join(
      ", "
    )}`,
  }),
  birthDate: z.string(),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
});
