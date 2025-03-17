export default function referralEmailTemplate({
  vetName,
  clinicName,
  patientName,
  department,
  urgent,
  withHtml = true
}: {
  vetName: string;
  clinicName: string;
  patientName: string;
  department: string;
  urgent: string;
  withHtml?: boolean;
}) {
  const content = `
    <style>
        body,
        table,
        td,
        a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            -ms-interpolation-mode: bicubic;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        table {
            border-collapse: collapse !important;
        }

        body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }
    </style>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td bgcolor="#132F55" align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="480">
                    <tr>
                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
                            <div style="display: block; font-family: Helvetica, Arial, sans-serif; color: #ffffff; font-size: 32px;"
                                border="0">VETTRUST
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="480">
                    <tr>
                        <td bgcolor="#ffffff" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td colspan="2"
                                        style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px; padding-top: 50px;">
                                        Sehr geehrtes TKB Team
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2"
                                        style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px; padding-top: 25px;">
                                        Bitte finden Sie im Anhang das Überweisungsformular von ${vetName} für den Patienten ${patientName}. Die Überweisung
                                        betrifft die Abteilung ${department}.
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2"
                                        style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px; padding-top: 25px;">
                                        Details der Überweisung:
                                        <br>
                                        • Überweisender Tierarzt/Tierärztin: ${vetName}
                                        <br>
                                        • Praxis: ${clinicName}
                                        <br>
                                        • Patient: ${patientName}
                                        <br>
                                        • Dringlichkeit: ${urgent}
                                        <br>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2"
                                        style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px; padding-top: 25px;">
                                        Bitte prüfen Sie die beigefügten Informationen und kontaktieren Sie den
                                        überweisenden Tierarzt/die Tierärztin für weitere Details oder zur
                                        Terminvereinbarung.
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2"
                                        style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px; padding-top: 25px;">
                                        Vielen Dank für Ihre Unterstützung.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="480">
                    <tr>
                        <td bgcolor="#f4f4f4" align="left"
                            style="padding: 30px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;">
                            <p style="margin: 0;">Diese E-Mail kommt von "<a href="https://vettrust.ch" target="_blank"
                                    style="color: #111111; font-weight: 700;">vettrust.ch<a>".
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    `;

  return withHtml
    ? `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body style="background-color: #f7f5fa; margin: 0 !important; padding: 0 !important;">
        ${content}
    </body>
    </html>`
    : `
    <body style="background-color: #f7f5fa; margin: 0 !important; padding: 0 !important;">
    ${content}
    </body>
    `;
}
