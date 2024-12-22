import { z } from "zod";

export const GENDER_OPTIONS = ["male", "female", "other"] as const;

const fullNameSchema = z
  .string()
  .min(3, "Full name must be at least 3 characters")
  .max(50, "Full name must be less than 50 characters");

const emailSchema = z
  .string()
  .email({ message: "Invalid email address" })
  .min(1, { message: "Email is required" });

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(16, "Password must be less than 50 characters")
  .regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
    "Password must include at least one uppercase letter, one lowercase letter, and one number"
  );
const nationalIdSchema = z
  .string()
  .regex(
    /^[1-9][0-9]{10}$/,
    "National ID must be 11 digits and start with a non-zero digit"
  );

const phoneSchema = z
  .string()
  .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" });

const genderSchema = z.enum(["male", "female", "other"], {
  required_error: "Gender is required",
});

const avatarSchema = z.object({
  uri: z.string().url("Invalid avatar URL"),
});

const addressSchema = z
  .string()
  .min(3, "Address must be at least 3 characters")
  .max(50, "Address must be less than 50 characters");

const birthDateSchema = z.string(); // Additional validation can be added if needed
const optionSchema = z.object({ label: z.string(), value: z.string() });

// Create SignUpSchema
export const SignUpSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  password: passwordSchema,
  nationalId: nationalIdSchema,
});

// Create UpdateProfileSchema
export const UpdateProfileSchema = z.object({
  fullName: fullNameSchema,
  newPassword: passwordSchema.optional(),
  nationalId: nationalIdSchema,
  address: addressSchema,
  gender: genderSchema,
  birthDate: birthDateSchema,
  phone: phoneSchema,
});

export const GuideSchema = z
  .object({
    type: optionSchema,
    minValue: z.number().min(0, "Min value must be at least 0"),
    maxValue: z.number().min(0, "Max value must be at least 0"),
    minAge: z.number().min(0, "Min age must be at least 0"),
    maxAge: z
      .number()
      .min(1, "Max age must be at least 1")
      .max(130, "Max age cannot be more than 130"),
    ageUnit: optionSchema,
  })
  .refine((data) => data.maxAge > data.minAge, {
    path: ["maxAge"], // Point to the field causing the issue
    message: "Max age must be greater than min age",
  })
  .refine((data) => data.maxValue > data.minValue, {
    path: ["maxValue"], // Point to the field causing the issue
    message: "Max value must be greater than min value",
  });
