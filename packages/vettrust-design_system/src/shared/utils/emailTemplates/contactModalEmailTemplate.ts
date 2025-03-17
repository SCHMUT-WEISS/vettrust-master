export default function contactModalEMailTemplate({
  petIsAlreadyPatient,
  breed,
  petName,
  ownerName,
  email,
  phoneNumber,
  message,
}: {
  petIsAlreadyPatient: string;
  breed: string;
  petName: string;
  ownerName: string;
  email: string;
  phoneNumber: string;
  message: string;
}) {
  return `
<style>
    body, table, td, a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
    }

    table, td {
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
<body style="background-color: #f7f5fa; margin: 0 !important; padding: 0 !important;">

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
        <td bgcolor="#132F55" align="center" style="padding: 0px 10px 0px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="480">
                <tr>
                    <td bgcolor="#ffffff" align="left" valign="top"
                        style="padding: 30px 30px 20px 30px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                        <h1 style="font-size: 24px; font-weight: 600; margin: 0;">&nbsp;</h1>
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
                                    <p>
                                        <b>
                                    <h1 style="font-size: 24px; font-weight: 600; margin: 0;">Kontakt Nachricht von:
                                        ${ownerName}</h1>
                                        </b>
                                        <br>
                                        <br>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                                    <p>
                                        Ein Benutzer hat das Kontaktformular mit den folgenden Daten ausgefüllt
                                        <br>
                                        <br>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Ist Ihr Haustier schon Patient?
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${petIsAlreadyPatient}
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Tierart
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${breed}
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                   Name Ihres Haustieres
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${petName}
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Ihr Vor- und Nachname
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${ownerName}
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    E-Mail Adresse
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${email}
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Telefonnummer
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${phoneNumber}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                                    <p>
                                        <b>
                                            Ihre Nachricht an uns
                                        </b>
                                        <br>
                                        <br>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                                    <p>
                                            ${message}
                                        <br>
                                    </p>
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
</body>
    `;
}
