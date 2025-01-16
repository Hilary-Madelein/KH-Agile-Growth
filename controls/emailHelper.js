const nodemailer = require("nodemailer");

const emailHelper = async (to, subject, text) => {
  try {
    // Configura el transportador
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "khagilegrowth@gmail.com",
        pass: "ublg rkwo rgwr gtwc",
      },
    });

    // Opciones del correo
    let mailOptions = {
      from: "khagilegrowth@gmail.com",
      to,
      subject,
      text,
    };

    // Envía el correo
    let info = await transporter.sendMail(mailOptions);
    console.log("Email enviado con éxito:", info.response);
    return info;
  } catch (error) {
    console.error("Error al enviar el correo:", error.message);
    throw error;
  }
};

module.exports = emailHelper;
