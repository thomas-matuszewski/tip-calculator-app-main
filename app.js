const bill = document.getElementById("bill");
const tipBtn = document.querySelectorAll(".btn");
const customTip = document.querySelector(".btn--custom");
const people = document.getElementById("people");
const error = document.getElementById("error");
const tip = document.getElementById("tip");
const sum = document.getElementById("total");
const resetBtn = document.querySelector(".reset");

let billValue = 0.0;
let tipValue = 0.15;
let peopleValue = 1;
let tipAmount = 0.0;
let total = 0.0;

function validationPeople(s) {
    var nr = /^[0-9]*$/;
    return s.match(nr);
}
function validationCustom(s) {
    var nr = /^[0-9]*\.?[0-9]*$/;
    return s.match(nr);
}

bill.addEventListener("input", () => {
    billValue = parseFloat(bill.value);
    tipCalculator();
});
tipBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        tipBtn.forEach((btn) => {
            btn.classList.remove("btn--active");

            if (e.target.innerHTML == btn.innerHTML) {
                btn.classList.add("btn--active");
                tipValue = parseFloat(btn.innerHTML) / 100;
                console.log(tipValue);
            }
            customTip.value = "";
            tipCalculator();
        });
    });
});

customTip.addEventListener("input", () => {
    if (!validationCustom(customTip.value)) {
        customTip.value = customTip.value.substring(
            0,
            customTip.value.lenght - 1
        );
    }
    tipBtn.forEach((btn) => {
        btn.classList.remove("btn--active");
    });
    tipValue = parseFloat(customTip.value / 100);
    if (customTip.value !== "") {
        tipCalculator();
    }
});

people.addEventListener("input", () => {
    if (!validationPeople(people.value)) {
        people.value = people.value.substring(1, people.value.lenght - 1);
    }
    peopleValue = parseFloat(people.value);
    if (peopleValue <= 0) {
        error.style.visibility = "visible";
        people.style.setProperty("outline", "2px solid darkred");
    } else {
        error.style.visibility = "hidden";
        people.style.setProperty("outline", "2px solid hsl(172, 67%, 45%)");
    }

    tipCalculator();
});
people.addEventListener("focus", () => {
    this.style.background = "darkred";
});

function tipCalculator() {
    if (peopleValue >= 1) {
        tipAmount = (billValue * tipValue) / peopleValue;
        total = (billValue * (tipValue + 1)) / peopleValue;
        tip.innerHTML = `$${tipAmount.toFixed(2)}`;
        sum.innerHTML = `$${total.toFixed(2)}`;
    }
}

resetBtn.addEventListener("click", () => {
    bill.value = "";
    people.value = 1;
    customTip.value = "";
    tipBtn[2].click();
    tip.innerHTML = "$0.00";
    sum.innerHTML = "$0.00";
});
