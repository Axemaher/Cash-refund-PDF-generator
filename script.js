(function () {
  const inputs = document.querySelectorAll(".line input[type=text]");
  const resultValue = document.querySelectorAll(".resultValue");
  const dateLabel = document.getElementById("date");
  const date = new Date();
  dateLabel.textContent = `${date.getDate()}.${date.getMonth() +
    1}.${date.getFullYear()}`;
  const companyCheckInput = document.getElementById("companyCheckInput");
  const errorsUl = document.querySelector(".errors ul");
  let errors = [];
  const generateBtn = document.getElementById("generate");

  document.querySelector(".buttonShowValues").addEventListener("click", () => {
    errors = [];
    errorsUl.textContent = "";
    let resultCount = 0;
    inputs.forEach(e => {
      switch (e.id) {
        case "bankNumber":
          if (numberValidation(e.value)) {
            resultValue[resultCount].textContent = numberValidation(e.value);
            e.value = numberValidation(e.value);
          }
          resultCount++;
          break;
        case "cash":
          if (emptyInputValidation(e.value)) {
            resultValue[resultCount].textContent = e.value;
          } else {
            errors.push("Proszę podać kwotę zwrotu");
          }
          resultCount++;
          break;
        case "nick":
          if (emptyInputValidation(e.value)) {
            resultValue[resultCount].textContent = e.value;
          } else {
            errors.push("Proszę podać nick");
          }
          resultCount++;
          break;
        case "nip":
          if (companyCheckInput.checked == true) {
            if (nipValidation(e.value)) {
              resultValue[resultCount].textContent = nipValidation(e.value);
              e.value = nipValidation(e.value);
            }
          }
          resultCount++;
          break;
        default:
          resultValue[resultCount].textContent = e.value;
          resultCount++;
      }
      errors.length > 0 ?
        (generateBtn.style.display = "none") :
        (generateBtn.style.display = "flex");
    });
    errorsLog();

  });
  /// Company checked?
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
  /// Validations
  const numberValidation = val => {
    if (val === "") {
      errors.push("Proszę podać numer konta");
      return false;
    } else {
      val = val.replace(/(\s)|(-)/g, "");
      if (val.length != 26) {
        errors.push("Proszę podać poprawny numer konta");
        return false;
      }
      let numberResArr = [];
      numberResArr.push(val.substring(0, 2));
      let beginStr = 2;
      let endStr = 6;
      for (let i = 0; i < 7; i++) {
        numberResArr.push(val.substring(beginStr, endStr));
        beginStr += 4;
        endStr += 4;
      }
      return numberResArr.join(" ");
    }
  };
  const emptyInputValidation = val => {
    if (val == "") {
      return false;
    } else return true;
  };
  const nipValidation = val => {
    if (companyCheckInput.checked) {
      if (val === "") {
        errors.push("Proszę podać NIP");
        return false;
      } else {
        val = val.replace(/(\s)|(-)/g, "");
        if (val.length != 10) {
          errors.push("Proszę podać poprawny numer NIP");
          return false;
        }
        let NIPResArr = [];
        NIPResArr.push(val.substring(0, 3));
        NIPResArr.push(val.substring(3, 6));
        NIPResArr.push(val.substring(6, 8));
        NIPResArr.push(val.substring(8, 11));

        return NIPResArr.join(" ");
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
  ///Generating PDF
  const displayInPdf = (id, style, title = "") => {
    let value = document.getElementById(id).value;
    if (value === "") {
      return;
    } else {
      return {
        text: `${title} ${document.getElementById(id).value}`,
        style: style
      };
    }
  };
  const displayInPdf2Var = (id, id2, style, title = "") => {
    return {
      text: `${title} ${document.getElementById(id).value}    ${document.getElementById(id2).value}`,
      style: style
    };
  };
  const fileNameChanging = () => {
    let filename;
    let name = document.getElementById("name").value;
    let companyName = document.getElementById("companyName").value;
    name === "" ? filename = companyName : filename = name;
    return filename
  };
  document.getElementById("generate").addEventListener("click", () => {
    var docDefinition = {
      content: [
        displayInPdf("bankNumber", "header", "Numer konta: "),
        displayInPdf("name", "subheader"),
        displayInPdf("companyName", "subheader"),
        displayInPdf("nip", "subheader"),
        displayInPdf("adress", "subheader"),
        displayInPdf2Var("postCode", "city", "subheader"),
        displayInPdf2Var("nick", "mail", "subheader"),
        displayInPdf("docNumber", "subheaderMargin"),
        displayInPdf("cash", "red", "Zwrot: "),
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
      .download(`${fileNameChanging()} ${document.getElementById("docNumber").value}.pdf`);
  });
}());