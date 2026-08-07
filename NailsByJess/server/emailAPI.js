import { Resend } from 'resend';
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.MAILKEY);

export async function sendMail(destination, name, ID, date, time) {
    try {
        const result = await resend.emails
        .send({
        from: 'Nails By Jess <no-reply@myatthitkoko.com>',
        to: destination,
        subject: 'Nail Appointment Confirmation',
        html: `<body style="margin:0; padding:0; font-family:Arial, sans-serif; color:#333;"> <table width="100%" cellpadding="0" cellspacing="0"> <tr> <td align="center" style="padding:30px 20px;"> <h1 style="margin:0; font-size:28px; color: #800020;"> Nails By Jess </h1> </td> </tr> <tr> <td align="center" style=" background-color:#16a34a; color:white; padding:20px; font-size:20px; font-weight:bold; "> APPOINTMENT CONFIRMATION </td> </tr> <tr> <td style="padding:30px 20px;"> <h2 style="margin:20px 0; font-size:20px;"> Thank you for making an appointment in advance. </h2> <hr style="border:none; border-top:3px solid #ddd;"> </td> </tr> <tr> <td style="padding:30px 20px;"> <h3 style="margin: 0;">Reservation Info</h3> <ul> <li> Name: ${name} </li> <li> Appointment ID: ${ID} </li> <li> Date: ${date} </li> <li> Time: ${time} </li> </ul> <p style="margin:0;"> Jess will later contact you via email regarding address details. </p> </td> </tr> <tr> <td style="padding:30px 20px;"> <p style="margin:0;"> Cancel or modify an appointment? </p> <ul> <li> <a href="mailto:contact@myatthitkoko.com">Reach out via mail</a> </li> <li>Call 123 456 7890</li> </ul> </td> </tr> </table> </body>`
        });

        console.log("Mail Result: ", result);
    } catch (err) {
        console.error("Mail failed: ", err);
    }
    
}