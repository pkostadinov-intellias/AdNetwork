import * as yup from "yup";

export const editProfileSchema = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be less than 30 characters")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    email: yup
      .string()
      .required("Email is required")
      .email("Must be a valid email"),
    fullName: yup
      .string()
      .max(100, "Full name must be less than 100 characters"),
    profession: yup
      .string()
      .max(100, "Profession must be less than 100 characters"),
    biography: yup
      .string()
      .max(500, "Biography must be less than 500 characters"),
    avatarUrl: yup.string().url("Must be a valid URL"),
    coverImageUrl: yup.string().url("Must be a valid URL")
  })
  .required();
