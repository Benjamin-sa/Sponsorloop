firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (!user.emailVerified) {
      alert("Uw e-mailadres is nog niet geverifieerd.");
      window.location.href = "index.html";
    }
  } else {
    window.location.href = "index.html";
  }
});
/*----------------------------------------------------*/
/*   verbiedt dubbele bedragen
/*----------------------------------------------------*/
const customAmountInput = document.querySelector(".form-control");
const radioButtons = document.querySelectorAll(".form-check-input");

customAmountInput.addEventListener("input", () => {
  radioButtons.forEach((radioButton) => {
    radioButton.checked = false;
  });
});
radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("change", () => {
    customAmountInput.value = "";
  });
});
/*----------------------------------------------------*/
/*   pop up menu
/*----------------------------------------------------*/

const submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const selectedNames = getSelectedNames();
  const amount = getSelectedAmount();

  if (selectedNames.length > 0 && amount >= 0) {
    const popup = document.getElementById("confirmation");
    popup.style.display = "block";
  } else {
    alert("Selecteer a.u.b. een naam en een bedrag voordat u verdergaat.");
  }
});

document.getElementById("close").addEventListener("click", function () {
  document.getElementById("confirmation").style.display = "none";
});

/*----------------------------------------------------*/
/*  donatie functies
/*----------------------------------------------------*/

let parsedData = null;

// Functie om de CSV-gegevens op te halen en te verwerken
async function parseCsvData() {
  const response = await fetch("js/ledenlijst.csv");
  const data = await response.text();
  parsedData = Papa.parse(data, {
    header: true,
    dynamicTyping: true,
    delimiter: ",",
    skipEmptyLines: true,
  }).data;
}

// Functie om de overeenkomende 'Takken' waarde te vinden voor een gegeven naam
function findMatchingTak(name) {
  let matchingRow = parsedData.find((row) => row["Naam"] === name);
  return matchingRow
    ? matchingRow["Takken"]
    : alert("Geen tak gevonden voor " + name);
}

// Functie om de geselecteerde namen op te halen
function getSelectedNames() {
  const selectedNamesDiv = document.getElementById("geselecteerdeNamen");
  return Array.from(selectedNamesDiv.children).map((child) =>
    child.textContent.slice(0, -1)
  );
}

// Functie om het geselecteerde bedrag op te halen
function getSelectedAmount() {
  const radios = document.getElementsByName("flexRadioDefault");
  for (let i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return document.querySelector('input[aria-label="hoeveelheid"]').value;
}

document.getElementById("Goed").addEventListener("click", async () => {
  if (!parsedData) {
    await parseCsvData();
  }
  const userID = firebase.auth().currentUser.uid;
  console.log(userID);
  const username = firebase.auth().currentUser.displayName;
  const email = firebase.auth().currentUser.email;
  const amount = getSelectedAmount();
  const selectedNames = getSelectedNames();

  let donateurRef = db.collection("Donateurs").doc(userID);

  donateurRef.set(
    {
      Naam: username,
      Email: email,
    },
    { merge: true }
  );

  for (let name of selectedNames) {
    let tak = findMatchingTak(name);
    if (tak) {
      let donatieRef = donateurRef.collection("Donaties").doc();

      donatieRef
        .set({
          LidID: name,
          Bedrag: amount,
        })
        .then(() => {
          alert("De donatie is succesvol verwerkt");

          // Stuur een POST-verzoek naar de server om de bevestigingsmail te verzenden
          fetch("/send-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: email,
              subject: "Donatie bevestiging",
              html: `
      <!DOCTYPE html>
      <html>
      <head>
      <style>
      body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f0f0f0;
      }

      .email-container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #212529;
          color: #ffffff;
          box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
          border-radius: 10px;
      }

      .header {
          text-align: center;
          padding: 20px 0;
      }

      .content {
          padding: 20px;
      }

      .footer {
          text-align: center;
          padding: 20px 0;
          color: #888888;
          font-size: 12px;
      }
  </style>
      </head>
      <body>
          <div class="email-container">
              <div class="header">
              <img src="https://lodlavki-sponsorloop.me/images/scouts/Sponserloop.png" alt="Scouts Lodlavki Logo" style="width: 90%; height: auto;">
              <h1>Bedankt voor je donatie!</h1>
              </div>
              <div class="content">
                  <p>Beste ${username},</p>
                  <p>Hartelijk dank voor uw donatie van €${amount}/ronde (250m) aan ${name} voor de sponsorloop van Scouts Lodlavki! We zijn enorm blij met uw steun.</p>
                  <p>Met vriendelijke groeten,</p>
                  <p>Scouts Lodlavki</p>
              </div>
              <div class="footer">
                  <p>Je ontvangt deze e-mail als bevestiging van je donatie aan Scouts Lodlavki.</p>
              </div>
          </div>
      </body>
      </html>
    `,
              
            }),
          })
            .then((response) => response.text())
            .then((data) => console.log(data))
            .catch((error) => {
              console.error("Error:", error);
            });
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
          if (error.code === "resource-exhausted") {
            alert("Limiet is vandaag bereikt, probeer het morgen opnieuw");
          } else {
            alert(
              "Er is een fout opgetreden bij het schrijven van de gegevens"
            );
          }
        });
    }
  }
});
