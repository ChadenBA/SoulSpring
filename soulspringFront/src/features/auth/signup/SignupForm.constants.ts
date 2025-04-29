import { GLOBAL_VARIABLES } from "@config/constants/globalVariables";
import { InputConfig } from "types/interfaces/InputConfig";

export const SIGNUP_FORM_CONFIG: Record<string, InputConfig> = {
  firstName: {
    name: "firstName",
    placeholder: "auth.first_name_placeholder",
    label: "auth.first_name",
    type: "text",
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: "auth.first_name_required" },
  },
  lastName: {
    name: "lastName",
    placeholder: "auth.last_name_placeholder",
    label: "auth.last_name",
    type: "text",
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: "auth.last_name_required" },
  },
  email: {
    name: "email",
    placeholder: "johnDoe@gmail.com",
    label: "auth.email",
    type: "email",
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: {
      required: "auth.email_required",
      pattern: {
         value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "auth.email_invalid",
      },
    },
  },
  password: {
    name: "password",
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: "auth.password",
    placeholder: "auth.password_placeholder",
    rules: {
      required: "auth.password_required",
    },
  },
  passwordConfirmation: {
    name: "passwordConfirmation",
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: "auth.confirm_password",
    placeholder: "auth.confirm_password_placeholder",
  },
  birthDate: {
    name: "birthDate",
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: "auth.birthdate",
    placeholder: "auth.birthdate_placeholder",
    type: "date",
  },

  // New fields
  role: {
    name: "role",
    label: "auth.role",
    placeholder: "auth.role_placeholder",
    type: "radio",
    defaultValue: "user", // Default role
    rules: { required: "auth.role_required" },
  },
  age: {
    name: "age",
    label: "auth.age",
    placeholder: "auth.age_placeholder",
    type: "number",
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
  },
  profilePicture: {
    name: "profilePicture",
    label: "auth.profile_picture",
    placeholder: "auth.profile_picture_placeholder",
    type: "file",
    rules: { required: "auth.profile_picture_required" },
  },
  specialite: {
    name: "specialite",
    label: "auth.specialite",
    placeholder: "auth.specialite",
    type: "text",
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
  },
  description: {
    name: "description",
    label: "auth.description",
    placeholder: "auth.description",
    type: "text",
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
  },
  contact: {
    name: "contact",
    label: "auth.contact",
    placeholder: "auth.contact",
    type: "text",
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
  },
  address: {
    name: "address",
    label: "address",
    placeholder: "address",
    type: "text",
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
  },
};
