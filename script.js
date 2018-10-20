const numberRes = document.getElementById("numberRes");
const nameRes = document.getElementById("nameRes");
const adressRes = document.getElementById("adressRes");
const postCodeRes = document.getElementById("postCodeRes");
const cityRes = document.getElementById("cityRes");
const cashRes = document.getElementById("cashRes");
const nickRes = document.getElementById("nickRes");
const mailRes = document.getElementById("mailRes");
const companyNameRes = document.getElementById("companyNameRes");
const NIPRes = document.getElementById("NIPRes");
const dateLabel = document.getElementById("date");
let date = new Date();
dateLabel.textContent =
  date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();

document.querySelector("button").addEventListener("click", () => {
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
  cashRes.textContent = cash;
  const nick = document.getElementById("nick").value;
  nickRes.textContent = nick;
  const mail = document.getElementById("mail").value;
  mailRes.textContent = mail;
  const companyName = document.getElementById("companyName").value;
  companyNameRes.textContent = companyName;
  let nip = document.getElementById("NIP").value;
  nip = nipValid(nip);
});
/////
const companyCheckInput = document.getElementById("companyCheckInput");
companyCheckInput.addEventListener("change", () => {
  if (companyCheckInput.checked) {
    document.querySelector(".companyName").style.display = "flex";
    document.querySelector(".NIP").style.display = "flex";
  } else {
    document.querySelector(".companyName").style.display = "none";
    document.querySelector(".NIP").style.display = "none";
  }
});
///
const numberValid = val => {
  // console.logzz(val);
  val = val.replace(/(\s)|(-)/g, "");
  if (val.length != 26) {
    alert("Niepoprawny numer konta");
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
  numberRes.textContent = numberResArr.join(" ");
};
const nipValid = val => {
  val = val.replace(/(\s)|(-)/g, "");
  if (val.length != 10) {
    alert("Niepoprawny numer NIP");
    return;
  }
  let NIPResArr = [];
  NIPResArr.push(val.substring(0, 3));
  NIPResArr.push(val.substring(3, 6));
  NIPResArr.push(val.substring(6, 8));
  NIPResArr.push(val.substring(8, 11));

  NIPRes.textContent = NIPResArr.join(" ");
};

// var doc = new jsPDF({
//     unit: 'in',
//     format: [4, 2]
// })

// doc.text('Hello world!', 1, 1)
// doc.save('two-by-four.pdf')
