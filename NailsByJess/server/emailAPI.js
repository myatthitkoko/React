import { Resend } from 'resend';
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.MAILKEY);

export async function sendMail(destination) {
    try {
        const result = await resend.emails
        .send({
        from: 'onboarding@resend.dev',
        to: destination,
        subject: 'Test Email',
        html: '<p>Congrats on successfully sending your <strong>email</strong>!</p>'
        });

        console.log("Mail Result: ", result);
    } catch (err) {
        console.error("Mail failed: ", err);
    }
    
}