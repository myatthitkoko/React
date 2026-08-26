import { Resend } from 'resend';
import { toZonedTime, format } from "date-fns-tz";
import dotenv from "dotenv";
import { MailTemplate } from "./MailTemplate.js"

dotenv.config();

const resend = new Resend(process.env.MAILKEY);

export async function sendMail(destination, name, ID, dateAndTime) {

    const convertedTime = toZonedTime(dateAndTime, "America/Los_Angeles");
    const date = format(convertedTime, "EEEE, MMMM d, yyyy", {timeZone: "America/Los_Angeles",});
    const time = format(convertedTime, "h:mm a", {timeZone: "America/Los_Angeles",});
    
    try {
        const result = await resend.emails
        .send({
        from: 'Nails By Jess <no-reply@myatthitkoko.com>',
        to: destination,
        cc: 'jesseniasnailss@gmail.com',
        subject: 'Nail Appointment Confirmation',
        html: MailTemplate({
            name, 
            ID, 
            date, 
            time}),
        });

        console.log("Mail Result: ", result);
    } catch (err) {
        console.error("Mail failed: ", err);
    }

}