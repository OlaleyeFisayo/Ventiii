export type EmailTemplateType =
  "verify-email"
  | "reset-password"
  | "new-email";

export type EmailTemplateData = {
  url?: string;
  otp?: string;
  newEmail?: string;
};
