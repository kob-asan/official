const password = document.getElementById("password");

const generate = document.getElementById("generate");

const copyButton = document.getElementById("copyButton");

const length = document.getElementById("length");

const lengthValue = document.getElementById("lengthValue");

const upper = document.getElementById("upper");

const lower = document.getElementById("lower");

const number = document.getElementById("number");

const symbol = document.getElementById("symbol");

const strengthFill = document.getElementById("strengthFill");

const strengthText = document.getElementById("strengthText");

const CHARSET = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    number: "0123456789",
    symbol: "!@#$%^&*()_-+=<>?/{}[]"
};

function random(max) {

    const array = new Uint32Array(1);

    crypto.getRandomValues(array);

    return array[0] % max;

}

function generatePassword() {

    let chars = "";

    if (upper.checked) chars += CHARSET.upper;
    if (lower.checked) chars += CHARSET.lower;
    if (number.checked) chars += CHARSET.number;
    if (symbol.checked) chars += CHARSET.symbol;

    if (!chars.length) {

        password.value = "";

        return;

    }

    let result = "";

    for (let i = 0; i < Number(length.value); i++) {

        result += chars[random(chars.length)];

    }

    password.value = result;

    updateStrength();

}

function updateStrength() {

    let score = 0;

    if (upper.checked) score++;
    if (lower.checked) score++;
    if (number.checked) score++;
    if (symbol.checked) score++;

    score += Math.floor(length.value / 8);

    score = Math.min(score, 10);

    strengthFill.style.width = `${score * 10}%`;

    if (score < 4) {

        strengthText.textContent = "Weak";

    } else if (score < 7) {

        strengthText.textContent = "Medium";

    } else if (score < 9) {

        strengthText.textContent = "Strong";

    } else {

        strengthText.textContent = "Very Strong";

    }

}

generate.addEventListener("click", generatePassword);

length.addEventListener("input", () => {

    lengthValue.textContent = length.value;

    generatePassword();

});

document.querySelectorAll("input[type=checkbox]").forEach(box => {

    box.addEventListener("change", generatePassword);

});

copyButton.addEventListener("click", async () => {

    if (!password.value) return;

    await navigator.clipboard.writeText(password.value);

    copyButton.textContent = "Copied!";

    setTimeout(() => {

        copyButton.textContent = "Copy";

    }, 1500);

});

generatePassword();