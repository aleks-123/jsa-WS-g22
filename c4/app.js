console.log("connected!!");

console.log("prv konzol log");
console.log("vtor konzol log");
setTimeout(() => {
  console.log("fetch the data");
}, 5000);
console.log("tret konzol log");
console.log("tret konzol log");
console.log("tret konzol log");
console.log("tret konzol log");

// [2, 3, 4].forEach((i) => i + 1);

const fetchFunction = async () => {
  try {
    const response = await fetch("https://swapi.dev/api/");
    console.log(response);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

fetchFunction();

const bingoPromise = new Promise(function (resolve, reject) {
  if (Math.random() >= 0.5) {
    resolve("you win!");
  } else {
    reject("you lose!");
  }
});

const bingoFunkcija = async () => {
  try {
    const result = await bingoPromise;
    console.log(result); // You win
  } catch (err) {
    console.error(err); // You lost
  }
};

bingoFunkcija();

console.log("tret konzol log");
console.log("tret konzol log");
console.log("tret konzol log");
console.log("tret konzol log");
