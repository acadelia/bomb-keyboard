const submitButton = document.getElementById("submitButton");
const timerDiv = document.getElementById("timer");
const keyboard = document.querySelector(".keyboard");
const digitContainer = document.getElementById("digitContainer");

let timer = 60;
let intervalId;
let alertShown = false;

const generateCode = () => {
  const characters = [..."0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  return Array.from(
    { length: 4 },
    () => characters[Math.floor(Math.random() * characters.length)]
  );
};

let code = generateCode();

const generateNewCode = () => {
  code = generateCode();
  console.log(code);
  timer = 60;
  updateTimer();
  alertShown = false;
  startGame();
};

const updateDigits = () => {
  return Array.from(digitDivs, (div) => div.textContent.trim().toUpperCase());
};

const updateTimer = () => {
  timerDiv.textContent = `Time: ${Math.floor(timer / 60)}:${(timer % 60)
    .toString()
    .padStart(2, "0")}`;
};

const submitGuess = () => {
  const guess = updateDigits();
  const digitDivs = Array.from(digitContainer.querySelectorAll(".digit"));
  let correctDigits = 0;

  digitDivs.forEach((div, i) => {
    if (guess[i] === code[i]) {
      div.classList.add("green");
      correctDigits++;
    } else {
      div.classList.add("red");
    }
  });

  if (correctDigits === 4) {
    const showTime = 60 - (60 - timer);
    clearInterval(intervalId);
    resetDigitDivs();
    alert(`Congratulations! Bomb defused! You saved ${showTime} seconds.`);
    generateNewCode();
  } else {
    setTimeout(() => {
      resetDigitDivs(digitDivs);
    }, 200);
    if (timer === 0 && !alertShown) {
      generateNewCode();
    }
  }
};

const resetDigitDivs = () => {
  digitDivs.forEach((div) => {
    div.classList.remove("green", "red");
    div.textContent = "";
  });
};

const updateTimerAndCheck = () => {
  updateTimer();
  if (timer === 0 && !alertShown) {
    clearInterval(intervalId);
    submitGuess();
    alertShown = true;
    alert("Time's up! The bomb exploded!");
  } else {
    timer--;
  }
};

//keyboard :)

const digitDivs = Array.from(digitContainer.querySelectorAll(".digit"));

let currentDigit = 0;
let animatedKey;

const handleKeyInteraction = (key) => {
  const keyText = key.textContent.toUpperCase();
  if (!/^[A-Z0-9]$/.test(keyText)) {
    return;
  }

  digitDivs[currentDigit].textContent = keyText;

  if (key.matches(".pinky, .ring, .middle, .pointer1st, .pointer2nd")) {
    currentDigit++;
    if (currentDigit >= digitDivs.length) {
      submitGuess();
      currentDigit = 0;
    }
  }
  if (animatedKey) {
    animatedKey.classList.remove("selected");
  }
  key.classList.add("selected");
  animatedKey = key;
  key.addEventListener("animationend", () => {
    key.classList.remove("selected");
    animatedKey = null;
  });
};

keyboard.addEventListener("click", (e) => {
  const key = e.target;
  handleKeyInteraction(key);
});

document.addEventListener("keyup", (event) => {
  const keyPressed = String.fromCharCode(event.keyCode);
  const keyElement = document.getElementById(keyPressed);
  if (keyElement) {
    handleKeyInteraction(keyElement);
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".keyboard")) {
    if (animatedKey) {
      animatedKey.classList.remove("selected");
      animatedKey = null;
    }
  }
});

const startGame = () => {
  clearInterval(intervalId);
  updateTimer();
  intervalId = setInterval(updateTimerAndCheck, 1000);
};

document.addEventListener("DOMContentLoaded", () => {
  generateNewCode();
  startGame();
});

console.log(code);

//sa lucreze mai repede ??
//sa pot sterge din div ??
//animatia la buton  -
//de simplificat codul ??
//stiling -
//animation de simplificat codul -
//sa fie in input allowed doar cifre si litere-
//settimeout de stert
