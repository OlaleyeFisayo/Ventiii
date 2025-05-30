export function verifyEmailTemplate(url: string) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Verify your Email</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Mobile responsiveness */
    @media only screen and (max-width: 600px) {
      .container {
        width: 100% !important;
        padding: 20px !important;
      }
      .content {
        width: 100% !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 1rem; background-color: #fbf8fb; font-family: 'Space Grotesk', 'Noto Sans', sans-serif;">
  <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #fbf8fb;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table width="600" cellpadding="0" cellspacing="0" class="container" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="padding: 0; text-align: center;">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzbWgF_flftFhZ-r5swXhQqq5G6uq0v9Ba7X6LaOwv8hupiGiVNo5PI5C5O_7XUyllm3_b6zhHV8DBdy0HxQ0V-wYcEbwfrcMcc4Fon-0aD9w1oV7P483-dVDpycwLx729hD9vcAxos8WYFgpYmpO3enLr-jKDera5RgcM_VsFpiD4ab9wHifH7tyVIT6PVA0roDC2Fan8ZJp6TqRKSucaP88bi73ufAitxMfygaiy7B7FtTceryFutDEIn3K1wE8w1IRMWShAq2g" 
              alt="Banner" width="100%" style="display: block; max-height: 250px; object-fit: cover;">
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; text-align: center;">
              <h2 style="color: #180e1b; font-size: 28px; margin: 0 0 20px; font-weight: bold;">Verify Your Email</h2>
              <p style="color: #180e1b; font-size: 16px; line-height: 1.5; margin: 0 0 20px;">
                Thank you for signing up with Ventiii. To complete your registration and start managing your events, please verify your email address.
              </p>
              <a href="${url}" style="display: inline-block; background-color: #aa1cce; color: #fbf8fb; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">
                Verify Email
              </a>
              <p style="color: #875095; font-size: 14px; margin: 30px 0 10px;">If you did not create an account, please ignore this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
