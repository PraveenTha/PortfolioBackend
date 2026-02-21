const nodemailer = require("nodemailer");

const sendMail = async ({ subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true only for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // 🔥 mail khud tumhe aayega
      subject,
      html,
    });

    console.log("📧 Contact mail sent successfully");
  } catch (err) {
    console.error("Mail send error:", err);
    throw err;
  }
};

module.exports = sendMail;
