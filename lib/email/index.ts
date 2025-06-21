import nodemailer from "nodemailer";

import type {
  EmailTemplateData,
  EmailTemplateType,
} from "./types";

import env from "../env";
import {
  getEmailTemplate,
} from "./template";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export async function sendEmail(
  to: string,
  type: EmailTemplateType,
  data: EmailTemplateData,
) {
  const {
    subject,
    text,
    html,
  } = getEmailTemplate(
    type,
    data,
  );

  await transporter.sendMail({
    from: env.SMTP_USER,
    to,
    subject,
    text,
    html,
  });
}
