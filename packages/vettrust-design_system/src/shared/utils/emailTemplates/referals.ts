export default function referralsEMailTemplate({
  referrerPractice,
  referrerVetName,
  referrerEmail,
  referrerPhone,
  petOwnerNames,
  petOwnerPhone,
  petOwnerAddress,
  patientSpeciesRace,
  patientPetName,
  patientPetWeightKgs,
  patientBirthdate,
  patientAgeInYears,
  patientGender,
  bankTransferReason,
  bankTransferReturnTransferPer,
  preliminaryReport,
  preTreatment,
}: {
  referrerPractice: string;
  referrerVetName: string;
  referrerEmail: string;
  referrerPhone: string;
  petOwnerNames: string;
  petOwnerPhone: string;
  petOwnerAddress: string;
  patientSpeciesRace: string;
  patientPetName: string;
  patientPetWeightKgs: string;
  patientBirthdate: string;
  patientAgeInYears: string;
  patientGender: string;
  bankTransferReason: string;
  bankTransferReturnTransferPer: string;
  preliminaryReport: string;
  preTreatment: string;
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
                                    <h1 style="font-size: 24px; font-weight: 600; margin: 0;">Empfehlungsnachricht von:
                                        ${petOwnerNames}</h1>
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
                                        Ein Benutzer hat das Überweisungsformular mit den folgenden Daten eingereicht
                                        <br>
                                        <br>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                                    <p>
                                        <b>
                                            ÜberweiserIn
                                        </b>
                                        <br>
                                        <br>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Praxis
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${referrerPractice}
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    TierärztIn
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:10px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${referrerVetName}
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    E-Mail Adresse
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${referrerEmail}
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Telefonnummer
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${referrerPhone}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                                    <p>
                                        <b>
                                            TierbesitzerIn
                                        </b>
                                        <br>
                                        <br>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Name der/des BesitzerIn
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${petOwnerNames}
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Telefonnummer
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${petOwnerPhone}
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Adresse
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${petOwnerAddress}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                                    <p>
                                        <b>
                                            PatientIn
                                        </b>
                                        <br>
                                        <br>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Art / Rasse
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${patientSpeciesRace}
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Tiername
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${patientPetName}
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Gewicht in KG
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${patientPetWeightKgs}
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Geburtsdatum
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${patientBirthdate}
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Alter in Jahren
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${patientAgeInYears}
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Geschlecht
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${patientGender}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                                    <p>
                                        <b>
                                            Überweisung
                                        </b>
                                        <br>
                                        <br>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Grund
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${bankTransferReason}
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Rücküberweisung per
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${bankTransferReturnTransferPer}
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Vorbericht
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${preliminaryReport}
                                </td>
                            </tr>
                            <tr>
                                <th align="left" valign="top"
                                    style="padding-left:30px;padding-right:15px;padding-bottom:30px; font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    Vorbehandlung
                                </th>
                                <td align="left" valign="top"
                                    style="padding-left:15px;padding-right:30px;padding-bottom:30px;font-family: Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                    ${preTreatment}
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
