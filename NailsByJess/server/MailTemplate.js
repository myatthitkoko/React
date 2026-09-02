export function MailTemplate({ name, ID, date, time }) {
  return `
    
    <body style="margin:0; padding: 30px; font-family:Georgia, 'Times New Roman', sans-serif; color:#333; background: #ffe4eb">
      <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 auto; max-width: 800px; border-radius: 30px; margin: 0 auto; background: white;">
        <tr>
          <td align="center" style="padding:30px 20px;">
            <h1 style="margin:0; font-size:20px; color:#800020;">
              Nails By <span style="display: block; font-size: 30px; color: #800020">Jess</span>
            </h1>
            <p>Los Angeles, CA</p>
          </td>
        </tr>

        <tr>
          <td
            align="center"
            style="background-color:#800020; color:white; padding:20px; font-size:20px; font-weight:bold;"
          >
            APPOINTMENT CONFIRMATION
          </td>
        </tr>

        <tr>
          <td style="padding:30px 20px;">
            <h2 style="margin:20px 0; font-size:20px;">
              Thank you ${name}!
            </h2>
            <p>Your appointment has been made successfully. Please review the following booking information.</p>
            <hr style="border:none; border-top:3px solid #ddd;">
          </td>
        </tr>

        <tr>
          <td style="padding:20px 40px 30px;">

              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background:#faf6f4; border-radius:12px;">

                <tr>
                  <td colspan="2" style="padding:20px 22px 10px; font-size:12px; text-transform:uppercase; letter-spacing:1.5px; color:#a47772; font-weight:bold;">
                    Appointment Details
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 22px; width:40%; color:#8b7d78; font-size:14px;">
                    Name
                  </td>
                  <td style="padding:10px 22px; color:#3d3634; font-size:14px; font-weight:bold;">
                    ${name}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 22px; color:#8b7d78; font-size:14px;">
                    Appointment ID
                  </td>
                  <td style="padding:10px 22px; color:#3d3634; font-size:14px; font-weight:bold;">
                    #${ID}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 22px; color:#8b7d78; font-size:14px;">
                    Date
                  </td>
                  <td style="padding:10px 22px; color:#3d3634; font-size:14px; font-weight:bold;">
                    ${date}
                  </td>
                </tr>

                <tr>
                  <td style="padding:10px 22px 22px; color:#8b7d78; font-size:14px;">
                    Time
                  </td>
                  <td style="padding:10px 22px 22px; color:#3d3634; font-size:14px; font-weight:bold;">
                    ${time}
                  </td>
                </tr>

              </table>
              <p>Jess will soon reach out to you via email regarding the business address before the date of the appointment.</p>
            </td>
        </tr>

        <tr>
          <td style="padding:30px 20px;">
            <p>Cancel or modify an appointment?</p>
            <ul>
              <li>
                <a href="mailto:jesseniasnailss@gmail.com">
                  Reach out via email
                </a>
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td
            align="center"
            style="background-color:#800020; color:white; padding:20px; font-size:20px; font-weight:bold; border-radius: 0 0 30px 30px;"
          >
            Nails By Jess
            <p style="font-size: 14px; color: #FFC1C1">Beauty & Personal Care</p>
          </td>
        </tr>
      </table>
    </body>
  `;
}