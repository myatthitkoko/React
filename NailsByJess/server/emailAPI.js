import { Resend } from 'resend';
import { toZonedTime, format } from "date-fns-tz";
import dotenv from "dotenv";
import { MailTemplate } from "./MailTemplate.js"
import { calendar } from "./googleCalendar.js"

dotenv.config();

const resend = new Resend(process.env.MAILKEY);

export async function sendMail(destination, name, ID, dateAndTime) {

    const convertedTime = toZonedTime(dateAndTime, "America/Los_Angeles");
    const date = format(convertedTime, "EEEE, MMMM d, yyyy", {timeZone: "America/Los_Angeles",});
    const time = format(convertedTime, "h:mm a", {timeZone: "America/Los_Angeles",});
    const endTime = new Date(dateAndTime.getTime() + 3 * 60 * 60 * 1000);

    const event = {
        summary: `Nail Appointment ${name}`,
        description: `Appointment ID:${ID}, booked through website`,
        start: {
            dateTime: dateAndTime.toISOString(),
            timeZone: 'America/Los_Angeles',
        },
        end: {
            dateTime: endTime.toISOString(),
            timeZone: 'America/Los_Angeles',
        },
    };

    await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        resource: event,
    });
    
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