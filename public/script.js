const baseUrl = `https://calendarific.com/api/v2`;
const endPoints = {
  holiday: '/holidays',
  languages: '/languages',
  countries: '/countries',
};
const apiBridge = `?api_key=`;
const apiKey = `45caf7c5ffb5de24c051a1c161f6d126c4a83beb`;

//for DOM manipulation
let submitForHolidaysBtn = document.getElementById('submitForHolidaysBtn');
let selectForm = document.getElementById('selectForm');

let div = document.querySelector('.section__results .row');

console.log(countryCode);
console.log(yearSelection);

//using for an array to use for h2's
let monthArray = [];

//creating the months class to take in the month code from the holidays api
class Months {
  constructor(monthCode) {
    this.monthCode = monthCode;
    this.january = [1, 'January'];
    this.february = [2, 'February'];
    this.march = [3, 'March'];
    this.april = [4, 'April'];
    this.may = [5, 'May'];
    this.june = [6, 'June'];
    this.july = [7, 'July'];
    this.august = [8, 'August'];
    this.september = [9, 'September'];
    this.october = [10, 'October'];
    this.november = [11, 'November'];
    this.december = [12, 'December'];
  }
  compareMonth() {
    let match = true;
    switch (match) {
      case this.january[0] === this.monthCode:
        //create an h2 for this section
        return this.january[1];
      case this.february[0] === this.monthCode:
        return this.february[1];
      case this.march[0] === this.monthCode:
        return this.march[1];
      case this.april[0] === this.monthCode:
        return this.april[1];
      case this.may[0] === this.monthCode:
        return this.may[1];
      case this.june[0] === this.monthCode:
        return this.june[1];
      case this.july[0] === this.monthCode:
        return this.july[1];
      case this.august[0] === this.monthCode:
        return this.august[1];
      case this.september[0] === this.monthCode:
        return this.september[1];
      case this.october[0] === this.monthCode:
        return this.october[1];
      case this.november[0] === this.monthCode:
        return this.november[1];
      case this.december[0] === this.monthCode:
        return this.december[1];
      default:
        console.log(`This is not a month`);
    }
  }
  setMonthArray() {
    monthArray.push(this.compareMonth());
    return monthArray;
  }
}

//I want to pass in the month code from the api to compare and return the month in words
// let jan = new Months(1);
// console.log('January:', jan.compareMonth());

//I want to return the year, that can be done by the api
//I want to pass in the holiday, that can be done by the api

//const holidayUrl = baseUrl + endPoints.holiday + apiBridge + apiKey;

//use this to switch out EndPoints between /holiday /languages and /countries
class Endpoint {
  constructor(endpoint) {
    this.url = baseUrl;
    this.endpoint = endpoint;
    this.bridge = apiBridge;
    this.key = apiKey;
  }
  setUrl() {
    return this.url + this.endpoint + this.bridge + this.key;
  }
}

let holidayEndpoint = new Endpoint(endPoints.holiday);

class HolidayEndpoint extends Endpoint {
  constructor(countryCode, year) {
    super();
    this.country = `&country=${countryCode}`;
    this.year = `&year=${year}`;
    this.endpoint = endPoints.holiday;
  }
  setHolidayUrlandFetch() {
    let baseHolidayUrl = this.setUrl();
    let url = baseHolidayUrl + this.country + this.year;
    let fetchApi = async () => {
      let response = await fetch(url);
      let data = await response.json();
      return data;
    };
    return fetchApi;
  }
}

//////////// INSTANCES OF HOLIDAYENDPOINTS BELOW

//will need to place this into the submit eventListener function

// let countryHolidays = new HolidayEndpoint(countryCode, yearSelection);

submitForHolidaysBtn.addEventListener('click', e => {
  e.preventDefault;
  let countryCode = document.getElementById('countryCode').value;
  let yearSelection = document.getElementById('yearSelection').value;
  let countryHolidayEndpoint = new HolidayEndpoint(countryCode, yearSelection);
  let countryHolidays = countryHolidayEndpoint.setHolidayUrlandFetch();
  countryHolidays()
    .then(data => {
      console.log(data.response);
      const holidayArray = data.response.holidays;
      console.log(holidayArray);
      for (let i = 0; i < holidayArray.length; i++) {
        let month = new Months(holidayArray[i].date.datetime.month);
        month.setMonthArray();
      }
      console.log('final month array: ', monthArray);
      // this is to delete duplicate months so we only print h2's with month one time
      let newMonths = monthArray.filter((item, index) => {
        return monthArray.indexOf(item) === index;
      });
      console.log('newMonths: ', newMonths);
      for (month of newMonths) {
        let h2 = document.createElement('h2');
        h2.innerText = month;
        let holidayDivContainer = document.createElement('div');
        holidayDivContainer.setAttribute('class', 'col-sm-3');
        let rowDiv = document.querySelector(
          '.section__results .container .row'
        );
        rowDiv.appendChild(holidayDivContainer);
        holidayDivContainer.appendChild(h2);
        //console.log(h2);
      }
      //select all the h2s and select all the div Containers
      let allh2s = document.querySelectorAll('.col-sm-3 h2');
      let wrappingDivs = document.querySelectorAll('.col-sm-3');
      console.log('wrappingDivs: ', wrappingDivs);

      // for each div container create an ul element and assign the id to match the h2 above it
      wrappingDivs.forEach(div => {
        let ul = document.createElement('ul');
        ul.setAttribute('class', 'holiday-list');
        console.log(
          'div.childNodes[0].innerText: ',
          div.childNodes[0].innerText
        );
        ul.setAttribute('id', div.childNodes[0].innerText);
        div.appendChild(ul);
      });

      for (let i = 0; i < holidayArray.length; i++) {
        console.log('holidayArray[i].name: ', holidayArray[i].name);

        //use new Month.compareMonth() for this below to return in words
        let monthCode = holidayArray[i].date.datetime.month;
        let whatMonth = new Months(monthCode);
        console.log('holidayArray[i].date.datetime.month: ', monthCode);
        console.log('whatMonth.compareMonth(): ', whatMonth.compareMonth());
        let targetUl = document.getElementById(whatMonth.compareMonth());
        console.log('targetUl: ', targetUl);

        if (whatMonth.compareMonth()) {
          console.log('what???? ', whatMonth.compareMonth());
          let newLi = new CreateElements(
            holidayArray,
            whatMonth.compareMonth(),
            targetUl,
            `${holidayArray[i].name} <span class="emphasisDay">(${holidayArray[i].date.datetime.month}.${holidayArray[i].date.datetime.day}.${holidayArray[i].date.datetime.year})</span>`
          );
          newLi.createLi();
        }
      }

      //insert above here
    })
    .catch(err => console.log(err));
});

// let holidayGhana21 = new HolidayEndpoint('gh', 2021);
// let holidayGhana21Url = holidayGhana21.setHolidayUrlandFetch();

// holidayGhana21Url()
//   .then(data => {
//     submitForHolidaysBtn.addEventListener('click', e => {
//       e.preventDefault;
//       let countryHolidays = new HolidayEndpoint(countryCode, yearSelection);
//       console.log(countryHolidays);
//       console.log(countryCode);
//       console.log(yearSelection);
//       //this is where the fetch function will go
//       const holidayArray = data.response.holidays;

//       for (let i = 0; i < holidayArray.length; i++) {
//         let month = new Months(holidayArray[i].date.datetime.month);
//         month.setMonthArray();
//       }
//       console.log('final month array: ', monthArray);
//       // this is to delete duplicate months so we only print h2's with month one time
//       let newMonths = monthArray.filter((item, index) => {
//         return monthArray.indexOf(item) === index;
//       });

//       console.log('newMonths: ', newMonths);
//       for (month of newMonths) {
//         let h2 = document.createElement('h2');
//         h2.innerText = month;
//         let holidayDivContainer = document.createElement('div');
//         holidayDivContainer.setAttribute('class', 'col-sm-3');
//         let rowDiv = document.querySelector(
//           '.section__results .container .row'
//         );
//         rowDiv.appendChild(holidayDivContainer);
//         holidayDivContainer.appendChild(h2);
//         //console.log(h2);
//       }

//       //select all the h2s and select all the div Containers
//       let allh2s = document.querySelectorAll('.col-sm-3 h2');
//       let wrappingDivs = document.querySelectorAll('.col-sm-3');
//       console.log('wrappingDivs: ', wrappingDivs);

//       // for each div container create an ul element and assign the id to match the h2 above it
//       wrappingDivs.forEach(div => {
//         let ul = document.createElement('ul');
//         ul.setAttribute('class', 'holiday-list');
//         console.log(
//           'div.childNodes[0].innerText: ',
//           div.childNodes[0].innerText
//         );
//         ul.setAttribute('id', div.childNodes[0].innerText);
//         div.appendChild(ul);
//       });

//       // console.log('allh2s: ', allh2s);

//       // console.log(
//       //   'allh2s.value: ',
//       //   allh2s.forEach(h2 => {
//       //     console.log(h2.innerHTML);
//       //   })
//       // );

//       for (let i = 0; i < holidayArray.length; i++) {
//         console.log('holidayArray[i].name: ', holidayArray[i].name);

//         //use new Month.compareMonth() for this below to return in words
//         let monthCode = holidayArray[i].date.datetime.month;
//         let whatMonth = new Months(monthCode);
//         console.log('holidayArray[i].date.datetime.month: ', monthCode);
//         console.log('whatMonth.compareMonth(): ', whatMonth.compareMonth());
//         let targetUl = document.getElementById(whatMonth.compareMonth());
//         console.log('targetUl: ', targetUl);

//         if (whatMonth.compareMonth()) {
//           console.log('what???? ', whatMonth.compareMonth());
//           let newLi = new CreateElements(
//             holidayArray,
//             whatMonth.compareMonth(),
//             targetUl,
//             `${holidayArray[i].name} <span class="emphasisDay">(${holidayArray[i].date.datetime.month}.${holidayArray[i].date.datetime.day}.${holidayArray[i].date.datetime.year})</span>`
//           );
//           newLi.createLi();
//         }

//         //for each instance I want to check to see if there is a
//         //ul with the id that matches the month
//         // and place the list item with innerText = Holiday Name  and day within that ul

//         //   let newLis = new CreateElements(
//         //     holidayArray,
//         //     'list-item',
//         //     document.querySelector('.col-sm-3 h'),
//         //     holidayArray[i].name
//         //   );
//         //   newLis.createLi();
//       }
//     });

//     console.log(data.response);
//   }) //holidayArray[0] returns an array and I will need to loop through?
//   .catch(err => console.log(err));

//functional programming below

// function addElement(month, year, holiday) {
//   const newDiv = document.createElement('div');
//   newDiv.setAttribute('class', 'col-sm-3');
//   div.appendChild(newDiv);
//   newDiv.innerHTML = `<h2>${month} ${year}</h2> <ul class="vacationList">`;
//   let list = document.querySelector('.vacationList');

//   // do this as long as their are holidays
//   let li = document.createElement('li');
//   li.setAttribute('class', 'list-item');
//   list.appendChild(li);
//   console.log('li: ', li);
//   li.innerHTML = `${holiday}`;

//   /**
//    * for each instance of holiday
//    * check the date
//    * if the month == the innerText of the h2  already exist, do not create element
//    * if the innerText value matches the
//    *
//    * now ch
//    */
// }

class CreateElements {
  constructor(array, attributeValue, elementToAppend, innerHTML) {
    this.array = array; //this will be the holiday array with descriptions
    this.attributeValue = attributeValue;
    this.elementToAppend = elementToAppend;
    this.innerHTML = innerHTML;
  }
  createLi() {
    let li = document.createElement('li');
    li.setAttribute('class', this.attributeValue);
    li.innerHTML = this.innerHTML;
    this.elementToAppend.appendChild(li);
    return li;
  }
  // createH2() {
  //   let h2 = document.createElement('h2');

  //   console.log('h2.innerHtml: ', h2.innerHTML);
  //   // allH2.forEach(h => {
  //   //   console.log('h2 of allH2: ', h);
  //   // });
  //   h2.innerText = this.month;
  //   console.log('h2.innerHtml2: ', h2.innerHTML);
  //   // console.log('allH2[0]: ', allH2[0]);
  //   return h2;
  //   //place h2 inside div

  //   //append div
  // }
  // createDiv(el) {
  //   //I will create this anytime there is a new month

  //   this.newDiv.appendChild(el);
  //   //console.log('newDiv in  class on line 211: ', this.newDiv);
  //   return this.newDiv;
  // }
  // createLi() {
  //   let li = document.createElement('li');
  //   li.innerText;
  // }
}
