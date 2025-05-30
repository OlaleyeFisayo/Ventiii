export type EmailTemplateType = "verify-email" | "reset-password";
export type EmailTemplateData = {
  url?: string;
  otp?: string;
};
