import nodemailer from 'nodemailer';

export async function sendOtpEmail(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f7fa; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 30px auto; padding: 20px; background-color: #fff;
                       border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
          .header { text-align: center; margin-bottom: 20px; }
          .header h1 { color: #4CAF50; }
          .content { font-size: 16px; color: #333; margin-bottom: 20px; }
          .otp { display: inline-block; padding: 10px 20px; font-size: 18px; font-weight: bold;
                 background-color: #4CAF50; color: white; border-radius: 5px; }
          .footer { text-align: center; font-size: 12px; color: #888; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header"><h1>Password Reset</h1></div>
          <div class="content">
            <p>We received a request to reset your password.</p>
            <p>Use the following OTP to reset it:</p>
            <p class="otp">${otp}</p>
            <p>This OTP is valid for 10 minutes.</p>
          </div>
          <div class="footer">
            <p>If you didn't request this, please ignore this email.</p>
            <p>&copy; ${new Date().getFullYear()} Your Company</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Your Password Reset OTP',
    html: htmlContent,
  });
}
