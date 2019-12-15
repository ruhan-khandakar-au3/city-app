/* eslint-disable function-paren-newline */
const myForm = document.querySelector("#myForm");
const statNm = document.querySelector("#stateName");

const upperFirstCharacter = string =>
  string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();

const getData = async cityName => {
  const response = await fetch(`/state/${upperFirstCharacter(cityName)}`);
  const data = await response.json();
  return data;
};

const printState = name => {
  statNm.innerHTML = "";
  statNm.innerHTML = `Frequent State Name: <strong>${name}</strong>`;
};

myForm.onsubmit = async e => {
  e.preventDefault();
  statNm.innerHTML = "";
  const formData = new FormData(myForm);

  const cityOneValue = formData.get("cityOne");
  const cityTwoValue = formData.get("cityTwo");
  const cityThreeValue = formData.get("cityThree");
  const cityFourValue = formData.get("cityFour");
  const cityFiveValue = formData.get("cityFive");

  if (
    !cityOneValue ||
    !cityTwoValue ||
    !cityThreeValue ||
    !cityFourValue ||
    !cityFiveValue
  ) {
    // eslint-disable-next-line no-alert
    alert("Please fill all field");
    return;
  }

  statNm.innerHTML = "Loading...";

  const firstState = await getData(cityOneValue);
  const secondState = await getData(cityTwoValue);
  const thirdState = await getData(cityThreeValue);
  const fourthState = await getData(cityFourValue);
  const fifthState = await getData(cityFiveValue);

  myForm.reset();

  const states = [
    firstState.data,
    secondState.data,
    thirdState.data,
    fourthState.data,
    fifthState.data
  ];

  //   If all are unique
  if (states.length === [...new Set(states)].length) {
    printState(upperFirstCharacter(states[0]));
    return;
  }

  const newMap = new Map();

  states.forEach(item => {
    if (newMap.has(item)) {
      newMap.set(item, newMap.get(item) + 1);
    } else {
      newMap.set(item, 1);
    }
  });

  // eslint-disable-next-line no-confusing-arrow
  const freqState = [...newMap.entries()].reduce((a, en) =>
    en[1] > a[1] ? en : a
  );

  printState(upperFirstCharacter(freqState[0]));
};
