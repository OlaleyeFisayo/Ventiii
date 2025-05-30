import type {
  EmailTemplateData,
  EmailTemplateType,
} from "../types";

import {
  resetPasswordTemplate,
} from "./reset-password";
import {
  verifyEmailTemplate,
} from "./verify-email";

export function getEmailTemplate(type: EmailTemplateType, data: EmailTemplateData) {
  const template = {
    "verify-email": {
      subject: "Verify your email address",
      text: `Click the link to verify your email: ${data?.url}`,
      html: verifyEmailTemplate(data?.url as string),
    },
    "reset-password": {
      subject: "Password Reset Request",
      text: `Your One-Time Password (OTP): ${data.otp}`,
      html: resetPasswordTemplate(data?.otp as string),
    },
  };

  return template[type];
}
