const baseUrl = `https://calendarific.com/api/v2`;
const endPoints = {
  holiday: '/holidays',
  languages: '/languages',
  countries: '/countries',
};
const apiBridge = `?api_key=`;
const apiKey = `45caf7c5ffb5de24c051a1c161f6d126c4a83beb`;

// const months = {
//   january: 1,
//   february: 2,
//   march: 3,
//   april: 4,
//   may: 5,
//   june: 6,
//   july: 7,
//   august: 8,
//   september: 9,
//   october: 10,
//   november: 11,
//   december: 12,
// };

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
        return this.january[1];
      case this.february[0] === this.monthCode:
        return this.february[1];
      case this.march[0] === this.monthCode:
        console.log(`the month is ${this.march[1]}`);
        break;
      case this.april[0] === this.monthCode:
        console.log(`the month is ${this.april[1]}`);
        break;
      case this.may[0] === this.monthCode:
        console.log(`the month is ${this.may[1]}`);
        break;
      case this.june[0] === this.june:
        console.log(`the month is ${this.june[1]}`);
        break;
      case this.july[0] === this.july:
        console.log(`the month is ${this.july[1]}`);
        break;
      case this.august[0] === this.monthCode:
        console.log(`the month is ${this.august[1]}`);
        break;
      case this.september[0] === this.monthCode:
        console.log(`the month is ${this.september[1]}`);
        break;
      case this.october[0] === this.monthCode:
        console.log(`the month is ${this.october[1]}`);
        break;
      case this.november[0] === this.monthCode:
        console.log(`the month is ${this.november[1]}`);
        break;
      case this.december[0] === this.monthCode:
        return this.december[1];
      default:
        console.log(`This is not a month`);
    }
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
//     for (let i = 0; i < data.response.holidays.length; i++) {
//       console.log(data.response.holidays[i]);
//     }
//   }) //data.response.holidays[0] returns an array and I will need to loop through?
//   .catch(err => console.log(err));

// let holidayMexico = new HolidayEndpoint('mx', 2020);
// let holidayMexicoUrl = holidayMexico.setHolidayUrlandFetch();

let holidayGhana21 = new HolidayEndpoint('gh', 2021);
let holidayGhana21Url = holidayGhana21.setHolidayUrlandFetch();

holidayGhana21Url()
  .then(data => {
    console.log(data.response);
    for (let i = 0; i < data.response.holidays.length; i++) {
      console.log(data.response.holidays[i]);

      //return month
      let month = new Months(data.response.holidays[i].date.datetime.month);
      console.log('Month of Holiday:', month.compareMonth());
      //return year
      console.log(
        'Year of Holiday: ',
        data.response.holidays[i].date.datetime.year
      );

      //descriptors
      //day
      console.log(
        'Day of Holiday: ',
        data.response.holidays[i].date.datetime.day
      );
      //description
    }
  }) //data.response.holidays[0] returns an array and I will need to loop through?
  .catch(err => console.log(err));
