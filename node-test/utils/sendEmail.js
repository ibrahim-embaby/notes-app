const { createTransport } = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

module.exports = async (to, link, name, subject, template) => {
  try {
    const transporter = createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 465,
      auth: {
        user: "7ee67c001@smtp-brevo.com",
        pass: "0OP57dpw4mJIy9jQ",
      },
    });

    // using custom email template with nodemailer express handler
    const handlebarsOptions = {
      viewEngine: {
        extname: ".handlebars",
        partialsDir: path.resolve("./views"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./views"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarsOptions));

    const mailOptions = {
      from: {
        name: "Notes",
        address: "hemaembaby80@gmail.com",
      },
      to: to,
      subject: subject,
      template: template,
      context: {
        name,
        link,
      },
    };
    return transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
