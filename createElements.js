//get elements
let submitForHolidaysBtn = document.getElementById('submitForHolidaysBtn');
let selectForm = document.getElementById('selectForm');
let countryCode = document.getElementById('countryCode').value;
let yearSelection = document.getElementById('yearSelection').value;
let div = document.querySelector('.section__results .row');

//create h2
//all comes form api
function addElement(month, year, holiday) {
  const newDiv = document.createElement('div');
  newDiv.setAttribute('class', 'col-sm-3');
  div.appendChild(newDiv);
  newDiv.innerHTML = `<h2>${month} ${year}</h2> <ul class="vacationList">`;
  let list = document.querySelector('.vacationList');

  // do this as long as their are holidays
  let li = document.createElement('li');
  li.setAttribute('class', 'list-item');
  list.appendChild(li);
  console.log('li: ', li);
  li.innerHTML = `${holiday}`;
}

addElement('August', 2020, 'Christmas');
//let h2

// selectForm.addEventListener('submit', e => {
//   e.preventDefault;
//   console.log(selectedCountryCode);
// });

// console.log(submitForHolidaysBtn);
submitForHolidaysBtn.addEventListener('click', e => {
  e.preventDefault;
  console.log(countryCode);
  console.log(yearSelection);

  //fetch function with addElement(with params);
});
