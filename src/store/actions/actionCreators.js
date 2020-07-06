import { INIT_EXCHANGE_RATES, CONVERT_RATES, ADD_TO_FAVORITE, INIT_GRAPHIC_RATES } from "./actionTypes";

const URL_ALL_rates = 'https://developerhub.alfabank.by:8273/partner/1.0.0/public/nationalRates';

export function getAllRates() {
  return async dispatch => {
    const rates = await fetch(URL_ALL_rates)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.rates;
      })

    const create = await createDb(rates);
    console.log('createcreate', create)
    
    console.log('rates', [...rates]);
    dispatch(initExchangeRates(rates))
    dispatch(getGraphicRates())
  }
}

export function initGraphicRates(graphicRates) {
  return {
    type: INIT_GRAPHIC_RATES,
    graphicRates
  }
}

export function initExchangeRates(rates) {
  return {
    type: INIT_EXCHANGE_RATES,
    rates
  }
}

export function convertRate(value, rate, quantity) {
  console.log('convertRate')
  return (dispatch) => {
    let bynRate = value / quantity * rate;

    dispatch(convertRates(bynRate))
  }
}

export function addToFavorite(id, favorite) {
  return (dispatch, getState) => {
    const rates = [...getState().rates.rates];

    const updatedRates = rates.map((item) => {
      if(item.iso === id) {
        item.favorite = !favorite;
      }

      return item;
    })

    console.log('updatedRates', updatedRates);

    const pageYOffset = window.pageYOffset;
    dispatch(addToFavoriteDispatch(updatedRates, pageYOffset))
  }
}

export function addToFavoriteDispatch(rates, pageYOffset) {
  return {
    type: ADD_TO_FAVORITE,
    rates,
    pageYOffset
  }
}

export function convertRates(rate) {
  return {
    type: CONVERT_RATES,
    rate
  }
}

export function getUrlConvertRates(rates) {
  return `https://www.nbrb.by/api/exrates/rates/${rates}?parammode=2`;
}

export function getGraphicRates() {
  return async (dispatch) => {
    const currencyCodes = [840, 978, 985];
    const stringCurrencyCodes = currencyCodes.join(',');
    const numbers = getNumbers();
    const dates = numbers.map((item) => graphDate(item));
    Promise.all(dates.map(item => getRates(stringCurrencyCodes, item))).then(rates => {
      const fetchRates = currencyCodes.map(itemRates => [].concat(...sortGraphicRates(rates, itemRates)))
      dispatch(initGraphicRates(fetchRates));
    })
  }
}

function sortGraphicRates(rates, code) {
  return rates !== undefined ? rates.map(item => item.filter(ii => ii.code === code)) : '';
}

async function getRates(currencyCodes, date) {
  const rates = await fetch(getGraphUrl(currencyCodes, date))
    .then((response) => {
      return response.json();
    })
    .then(data => data.rates)
      
  return rates;
}

function getNumbers() {
  const numbers = [];

  for(let i = 0; i < 14; i++) {
    numbers.push(i);
  }

  return numbers;
}

function graphDate(day = null) {
  const d = new Date();

  if(day !== null) {
    d.setDate(d.getDate() - day)
  }
  
  const curr_date = d.getDate() >= 10 ?  d.getDate() : `0${d.getDate()}`;
  const curr_month = d.getMonth() + 1 >= 10 ?  d.getMonth() + 1 : `0${d.getMonth() + 1}`;
  const curr_year = d.getFullYear();

  return `${curr_date}.${curr_month}.${curr_year}`
}

function getGraphUrl(currencyCodes, date) {
  return `https://developerhub.alfabank.by:8273/partner/1.0.1/public/nationalRates?currencyCode=${currencyCodes}&date=${date}`
}

function createDb(rates) {
  let dbReq = indexedDB.open('ExchangeRates', 1);
  dbReq.onupgradeneeded = (event) => {
    // Зададим переменной db ссылку на базу данных
    const db = event.target.result;
    // Создадим хранилище объектов с именем notes.
    db.createObjectStore('rates', {autoIncrement: true});
    db.createObjectStore('graphicRates', {autoIncrement: true});
	}
}

const addRates = (rates) => {
  let dbReq = indexedDB.open('ExchangeRates', 1);
  dbReq.onsuccess = async (event) => {
    const db = event.target.result;
    let transaction = db.transaction('rates', 'readwrite');
    let store = transaction.objectStore('rates');
    rates.forEach(item => {
      store.add(item);
    })
  }
}

const addGraphicRates = (rates) => {
  let dbReq = indexedDB.open('ExchangeRates', 1);
  dbReq.onsuccess = async (event) => {
    const db = event.target.result;
    let transaction = db.transaction('graphicRates', 'readwrite');
    let store = transaction.objectStore('graphicRates');
    rates.forEach(item => {
      store.add(item);
    })
  }
}

function getGraphicRatesFromDatabase() {
  let dbReq = indexedDB.open('ExchangeRates', 1);
  
  let promise = new Promise(function(resolve, reject) {
    dbReq.onsuccess = async (event) => {
      const db = event.target.result;
      let transaction = db.transaction('graphicRates', 'readwrite');

      transaction.objectStore('rates').getAll().onsuccess = (event) => {
        resolve(event.target.result)
      };
    }
    

  });
	
	return promise;
}

function getRatesFromDatabase() {
  let dbReq = indexedDB.open('ExchangeRates', 1);
  
  let promise = new Promise(function(resolve, reject) {
    dbReq.onsuccess = async (event) => {
      const db = event.target.result;
      let transaction = db.transaction('rates', 'readwrite');

      transaction.objectStore('rates').getAll().onsuccess = (event) => {
        resolve(event.target.result)
      };
    }
    

  });
	
	return promise;
}

export const initalApp = () => {
  return async (dispatch, getState) => {

    const isValidTime = isValidTime();

    if(isValidTime === false) {
      const rates = await fetchRates();
    }

  }
}

async function fetchRates() {
  const rates = await fetch(URL_ALL_rates)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data.rates;
    })

  return rates;
}

function isValidTime() {
  const localDate = localStorage.getItem('date');

  if (localDate !== null) {
    let startDate = new Date(localDate);
    let endDate = new Date();
    startDate.setHours(startDate.getHours() + 1);

    if (startDate > endDate) {
      return true;
    }
  }

  return false;
}

function getData() {
  const isValidTime = isValidTime();

  if(isValidTime === true) {
 
  }
}