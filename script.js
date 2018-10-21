const numberRes = document.getElementById("numberRes");
const nameRes = document.getElementById("nameRes");
const adressRes = document.getElementById("adressRes");
const postCodeRes = document.getElementById("postCodeRes");
const cityRes = document.getElementById("cityRes");
const cashRes = document.getElementById("cashRes");
const nickRes = document.getElementById("nickRes");
const mailRes = document.getElementById("mailRes");
const docNumberRes = document.getElementById("docNumberRes");
const companyNameRes = document.getElementById("companyNameRes");
const NIPRes = document.getElementById("NIPRes");
const dateLabel = document.getElementById("date");
const companyCheckInput = document.getElementById("companyCheckInput");
const errorsUl = document.querySelector(".errors ul");
let errors = [];
const date = new Date();
dateLabel.textContent = `${date.getDate()}.${date.getMonth() +
  1}.${date.getFullYear()}`;

document.querySelector("button").addEventListener("click", () => {
  errors = [];
  let number = document.getElementById("number").value;
  number = numberValid(number);
  const name = document.getElementById("name").value;
  nameRes.textContent = name;
  const adress = document.getElementById("adress").value;
  adressRes.textContent = adress;
  const postCode = document.getElementById("postCode").value;
  postCodeRes.textContent = postCode;
  const city = document.getElementById("city").value;
  cityRes.textContent = city;
  const cash = document.getElementById("cash").value;
  cashValid(cash);
  const nick = document.getElementById("nick").value;
  nickValid(nick);
  const mail = document.getElementById("mail").value;
  mailRes.textContent = mail;
  const docNumber = document.getElementById("docNumber").value;
  docNumberRes.textContent = docNumber;
  const companyName = document.getElementById("companyName").value;
  companyNameRes.textContent = companyName;
  let nip = document.getElementById("NIP").value;
  nip = nipValid(nip);
  errorsUl.textContent = "";
  errorsLog();
  createValid();
});
companyCheckInput.addEventListener("change", () => {
  const changeVisible = (selector, style) => {
    document.querySelector(selector).style.display = style;
  };
  if (companyCheckInput.checked) {
    changeVisible(".companyName", "flex");
    changeVisible(".NIP", "flex");
  } else {
    changeVisible(".companyName", "none");
    changeVisible(".NIP", "none");
  }
});
/// VALIDATING FUNCTIONS
const numberValid = val => {
  if (val == "") {
    errors.push("Proszę podać numer konta");
    return;
  } else {
    val = val.replace(/(\s)|(-)/g, "");
    if (val.length != 26) {
      errors.push("Proszę podać poprawny numer konta");
      return;
    }
    let numberResArr = [];
    numberResArr.push(val.substring(0, 2)); //first two numbers of bank number
    let beginStr = 2;
    let endStr = 6;
    for (let i = 0; i < 7; i++) {
      numberResArr.push(val.substring(beginStr, endStr));
      beginStr += 4;
      endStr += 4;
    }
    numberRes.textContent = `Numer konta: ${numberResArr.join(" ")}`;
  }
};

const cashValid = val => {
  if (val == "") {
    errors.push("Proszę podać kwotę zwrotu");
    return;
  } else {
    cashRes.textContent = `Kwota zwrotu: ${val}`;
  }
};
const nickValid = val => {
  if (val == "") {
    errors.push("Proszę podać nick");
    return;
  } else {
    nickRes.textContent = `Nick: ${val}`;
  }
};

const nipValid = val => {
  if (companyCheckInput.checked) {
    if (val == "") {
      errors.push("Proszę podać NIP");
      return;
    } else {
      val = val.replace(/(\s)|(-)/g, "");
      if (val.length != 10) {
        errors.push("Proszę podać poprawny numer NIP");
        return;
      }
      let NIPResArr = [];
      NIPResArr.push(val.substring(0, 3));
      NIPResArr.push(val.substring(3, 6));
      NIPResArr.push(val.substring(6, 8));
      NIPResArr.push(val.substring(8, 11));

      NIPRes.textContent = `NIP: ${NIPResArr.join(" ")}`;
    }
  }
};
const errorsLog = () => {
  errors.forEach(e => {
    let li = document.createElement("li");
    li.textContent = e;
    errorsUl.appendChild(li);
  });
};
const createValid = () => {
  if (errors.length > 0) {
    document.getElementById("generate").style.display = "none";
  } else {
    document.getElementById("generate").style.display = "flex";
  }
};

document.getElementById("generate").addEventListener("click", () => {
  var docDefinition = {
    content: [
      {
        text: `${numberRes.textContent}`,
        style: "header"
      },
      {
        text: `${nameRes.textContent}`,
        style: "subheader"
      },
      {
        text: `${adressRes.textContent}`,
        style: "subheader"
      },
      {
        text: `${postCodeRes.textContent}  ${cityRes.textContent}`,
        style: "subheader"
      },
      {
        text: `${nickRes.textContent}  ${mailRes.textContent}`,
        style: "subheader"
      },
      {
        text: `${companyNameRes.textContent}`,
        style: "subheader"
      },
      {
        text: `${NIPRes.textContent}`,
        style: "subheader"
      },
      {
        text: `${docNumberRes.textContent}`,
        style: "subheaderMargin"
      },
      {
        text: `${cashRes.textContent} zł`,
        style: "red"
      }
    ],

    footer: {
      text: `${dateLabel.textContent}`,
      style: "footer"
    },

    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 20, 0, 20]
      },
      subheader: {
        fontSize: 15,
        margin: [0, 5, 0, 5]
      },
      subheaderMargin: {
        fontSize: 18,
        margin: [0, 10, 0, 5],
        bold: true
      },
      red: {
        fontSize: 18,
        color: "red",
        bold: true
      },
      footer: {
        margin: [10, 10, 10, 10]
      }
    }
  };
  pdfMake
    .createPdf(docDefinition)
    .download(`${nameRes.textContent} ${docNumberRes.textContent}.pdf`);
});
