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
let countryCode = document.getElementById('countryCode').value;
let yearSelection = document.getElementById('yearSelection').value;
let div = document.querySelector('.section__results .row');

//test
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
      case this.june[0] === this.june:
        return this.june[1];
      case this.july[0] === this.july:
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

//holidayUS fetch URL               //loop through so this is dynamic
// let holidayUS = new HolidayEndpoint('US', 2019);
// let holidayUsUrl = holidayUS.setHolidayUrlandFetch();

// holidayUsUrl()
//   .then(data => {
//     for (let i = 0; i < holidayArray.length; i++) {
//       console.log(holidayArray[i]);
//     }
//   }) //holidayArray[0] returns an array and I will need to loop through?
//   .catch(err => console.log(err));

// let holidayMexico = new HolidayEndpoint('mx', 2020);
// let holidayMexicoUrl = holidayMexico.setHolidayUrlandFetch();

let holidayGhana21 = new HolidayEndpoint('gh', 2021);
let holidayGhana21Url = holidayGhana21.setHolidayUrlandFetch();

holidayGhana21Url()
  .then(data => {
    submitForHolidaysBtn.addEventListener('click', e => {
      e.preventDefault;
      console.log(countryCode);
      console.log(yearSelection);
      //this is where the fetch function will go
      const holidayArray = data.response.holidays;

      for (let i = 0; i < holidayArray.length; i++) {
        console.log(holidayArray[i]);

        //return month
        let month = new Months(holidayArray[i].date.datetime.month);
        console.log('month: ', month.setMonthArray());
        //console.log('Month of Holiday:', month.compareMonth());
        //return year
        //console.log('Year of Holiday: ', holidayArray[i].date.datetime.year);

        //descriptors
        //day
        //console.log('Day of Holiday: ', holidayArray[i].date.datetime.day);
        //description
        // addElement(
        //   month.compareMonth(),
        //   holidayArray[i].date.datetime.year,
        //   holidayArray[i].name
        // );
        let example = new CreateElements(
          holidayArray,
          month.compareMonth(),
          holidayArray[i].date.datetime.day,
          holidayArray[i].name
        );
        div.appendChild(example.createDiv());
      }
      console.log('final month array: ', monthArray);
      // this is to delete duplicates
      let newMonths = monthArray.filter((item, index) => {
        console.log(
          item,
          index,
          monthArray.indexOf(item),
          monthArray.indexOf(item) === index
        );
        return monthArray.indexOf(item) === index;
      });
      console.log('newMonths: ', newMonths);
      let theUndefined = newMonths.indexOf(undefined);
      console.log('theUndefined: ', theUndefined);
      if (theUndefined > -1) {
        newMonths.splice(theUndefined, 1);
      }
      console.log('newMonths after splice: ', newMonths);
      //I want to use the array above to take out duplicates and take out undefined and create an h2 element that is at the top of the div above the li
      //fetch function with addElement(with params);
    });

    console.log(data.response);
  }) //holidayArray[0] returns an array and I will need to loop through?
  .catch(err => console.log(err));

//functional programming below

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

  /**
   * for each instance of holiday
   * check the date
   * if the month == the innerText of the h2  already exist, do not create element
   * if the innerText value matches the
   *
   * now ch
   */
}

class CreateElements {
  constructor(array, month, year, holiday) {
    this.array = array; //this will be the holiday array with descriptions
    this.month = month;
    this.year = year;
    this.holiday = holiday;
    this.newDiv = document.createElement('div');
    this.newDiv.setAttribute('class', 'col-sm-3');
  }
  createH2() {
    let h2 = document.createElement('h2');
    let allH2 = document.querySelectorAll('h2');
    console.log('h2.innerHtml: ', h2.innerHTML);
    // allH2.forEach(h => {
    //   console.log('h2 of allH2: ', h);
    // });
    h2.innerText = this.month;
    console.log('h2.innerHtml2: ', h2.innerHTML);
    console.log('allH2[0]: ', allH2[0]);
    return h2;
    //place h2 inside div

    //append div
  }
  createDiv() {
    //I will create this anytime there is a new month

    this.newDiv.appendChild(this.createH2());
    console.log('newDiv in  class on line 211: ', this.newDiv);
    return this.newDiv;
  }
  createLi() {
    let li = document.createElement('li');
    li.innerText;
  }
}

let example = new CreateElements();
