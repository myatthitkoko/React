export function MailTemplate({ name, ID, date, time }) {
  return `
    <body style="margin:0; padding:0; font-family:Arial, sans-serif; color:#333;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:30px 20px;">
            <h1 style="margin:0; font-size:28px; color:#800020;">
              Nails By Jess
            </h1>
          </td>
        </tr>

        <tr>
          <td
            align="center"
            style="background-color:#16a34a; color:white; padding:20px; font-size:20px; font-weight:bold;"
          >
            APPOINTMENT CONFIRMATION
          </td>
        </tr>

        <tr>
          <td style="padding:30px 20px;">
            <h2 style="margin:20px 0; font-size:20px;">
              Thank you for making an appointment in advance.
            </h2>
            <hr style="border:none; border-top:3px solid #ddd;">
          </td>
        </tr>

        <tr>
          <td style="padding:30px 20px;">
            <h3 style="margin:0;">Reservation Info</h3>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Appointment ID:</strong> ${ID}</li>
              <li><strong>Date:</strong> ${date}</li>
              <li><strong>Time:</strong> ${time}</li>
            </ul>

            <p>Jess will later contact you via email regarding address details.</p>
          </td>
        </tr>

        <tr>
          <td style="padding:30px 20px;">
            <p>Cancel or modify an appointment?</p>
            <ul>
              <li>
                <a href="mailto:contact@myatthitkoko.com">
                  Reach out via email
                </a>
              </li>
              <li>Call 123 456 7890</li>
            </ul>
          </td>
        </tr>
      </table>
    </body>
  `;
}