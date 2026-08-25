import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const calendar = google.calendar({
    version: "v3",
    auth: oauth2Client
});

app.get("/api/google/auth", async (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/calendar.readonly"
        ],
        prompt: "consent"
    });

    res.redirect(url);
});

app.get("/api/google/callback", async (req, res) => {
    try {
        const { code } = req.query;

        const { tokens } = await oauth2Client.getToken(code);

        console.log("Google OAuth successful");
        console.log("Refresh token exists:", Boolean(tokens.refresh_token));

        res.send("Google Calendar connected successfully.");
    } catch (err) {
        console.error("Google OAuth failed:", err);
        res.status(500).send("Google Calendar authorization failed.");
    }
});

export async function readCalendarEvents(start, end) {
    const response = await calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        singleEvents: true,
        orderBy: "startTime"
    });

    return response.data.items ?? [];
}