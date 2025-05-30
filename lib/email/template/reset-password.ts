export function resetPasswordTemplate(otp: string) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset OTP</title>
</head>
<body style="margin: 0; padding: 1rem; font-family: 'Space Grotesk', 'Noto Sans', sans-serif; background-color: #fbf8fb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fbf8fb; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
          <!-- Main content -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="font-size: 24px; color: #180e1b; font-weight: bold; text-align: center;">Password Reset Request</h2>
              <p style="font-size: 16px; color: #180e1b; text-align: center; line-height: 1.5; margin-top: 10px;">
                You recently requested to reset your password for your Ventiii account. Please use the One-Time Password (OTP) below to proceed with resetting your password.
              </p>

              <!-- OTP Box -->
              <h3 style="text-align: center; color: #180e1b; font-size: 18px; font-weight: bold; margin: 30px 0 10px;">Your One-Time Password (OTP)</h3>
              <table align="center" cellpadding="0">
                <tr>
                  <td>
                    <p style="background-color: #f0e8f3; padding: 15px 10px 15px 20px; font-size: 20px; font-weight: bold; border-radius: 8px; letter-spacing: 1rem;">
                        ${otp}
                    </p>
                </td>
                </tr>
              </table>

              <!-- Info -->
              <p style="font-size: 14px; color: #180e1b; text-align: center; line-height: 1.5; margin-top: 20px;">
                Enter this OTP on the password reset page to verify your identity and set a new password. This OTP is valid for the next 5 minutes.
              </p>
              <p style="font-size: 14px; color: #180e1b; text-align: center; line-height: 1.5;">
                If you did not request a password reset, please ignore this email or contact our support team immediately to ensure the security of your account.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
