import nodemailer from 'nodemailer'
import { env } from "@/env";


export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: env.MAILER_EMAIL,
    pass: env.MAILER_KEY
  }
})

export async function SendMail(email: string, code: string | null, token: string | null) {
  if (token && token.length > 0) {

    transporter.sendMail({
      from: env.MAILER_EMAIL,
      to: email,
      subject: '[RECUPERAÇÃO DE SENHA]',
      html: `<p>Clique <a href='https://challenge-interface.vercel.app/nova-senha?token=${token}'>Aqui </a>para definir sua nova senha </p>
      `
    })

  } else {
    transporter.sendMail({
      from: env.MAILER_EMAIL,
      to: email,
      subject: 'Códido de confirmação',
      text: `Aqui está o seu código de confirmação ${code}`
    })
  }
}