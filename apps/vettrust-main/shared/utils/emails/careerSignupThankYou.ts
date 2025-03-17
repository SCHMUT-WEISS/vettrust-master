interface EmailFields {
  title: string;
  body: string;
  bestRegards: string;
  sentFrom: string;
  position: string;
}

const emailGenerator = ({ title, body, bestRegards, sentFrom, position }: EmailFields) => {
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
          <table border="0" cellpadding="0" cellspacing="0" width="600">
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
          <table border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
                  <td bgcolor="#ffffff" align="left" valign="top"
                      style="padding: 30px 30px 20px 30px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                      <h1 style="font-size: 24px; font-weight: 600; margin: 0;">${title}</h1>
                  </td>
              </tr>
          </table>
      </td>
  </tr>
  <tr>
      <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
          <table border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
                  <td bgcolor="#ffffff" align="left">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                              <td colspan="2"
                                  style="padding-left:30px;padding-right:15px;padding-bottom:10px; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 25px;">
                                  <p>
                                    ${body}
                                      <br>
                                      <br>
                                  </p>
                                  <p>${bestRegards}</p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
              <tr>
                  <td bgcolor="#ffffff" align="center">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                              <td bgcolor="#ffffff" align="left"
                                  style="padding: 30px 30px 30px 30px; border-top:1px solid #dddddd;">
                                  <table border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                          <td align="left" style="border-radius: 3px;">
                                            <p>Carina Scheller</p>
                                            <p>${position}</p>
                                            <p>VetTrust AG</p>
                                          </td>
                                      </tr>
                                  </table>
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
          <table border="0" cellpadding="0" cellspacing="0" width="600">
              <tr>
                  <td bgcolor="#f4f4f4" align="left"
                      style="padding: 30px 30px 30px 30px; color: #666666; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;">
                      <p style="margin: 0;">${sentFrom} "<a href="https://vettrust.ch" target="_blank"
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
};

const english: EmailFields = {
  title: "Welcome to our VetTrust Career Network!",
  body: "Thank you for signing up for the career network. We will get back to you with job offers as soon as something fitting comes along our way!",
  bestRegards: "Best regards",
  position: "HR Professional",
  sentFrom: "This email is From"
};

const german: EmailFields = {
  title: "Willkommen zu unserem VetTrust-Karrierenetzwerk!",
  body: "Vielen Dank, dass du dich für das Karrierenetzwerk angemeldet hast. Wir werden uns mit Stellenangeboten bei dir melden, sobald wir eine passende Stelle haben!",
  bestRegards: "Mit freundlichen Grüßen",
  position: "HR-Fachfrau",
  sentFrom: "Diese E-Mail kommt von"
};

const french: EmailFields = {
  title: "Bienvenue au sein de notre liste de distribution relative aux postes vacants chez VetTrust!",
  body: "Nous vous remercions de votre inscription. Nous vous enverrons des offres d’emploi dès que nous aurons trouvé un poste qui vous convient!",
  bestRegards: "Avec nos meilleures salutations",
  position: "Spécialiste RH",
  sentFrom: "Cet e-mail provient de"
};


const careerSignupThankYouEmail = {
  en: emailGenerator(english),
  de: emailGenerator(german),
  fr: emailGenerator(french),
};

export default careerSignupThankYouEmail;