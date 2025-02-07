import nodemailer from 'nodemailer';

type MailTransporter = nodemailer.Transporter;

const transporter: MailTransporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'roypa81130@gmail.com',
    pass: 'nxyk cpwz nuto ikoi'
  }
});

export default transporter;
