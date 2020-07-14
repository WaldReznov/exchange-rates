import { INIT_EXCHANGE_RATES, CONVERT_RATES, ADD_TO_FAVORITE, INITIAL_APP, FROM_RATE, TO_RATE } from "./actionTypes";

const URL_ALL_RATES = 'https://developerhub.alfabank.by:8273/partner/1.0.0/public/nationalRates';
const HOURS = 1;
const DAYS = 1;

export async function getAllRates() {
  const time = isValidRatesTime(HOURS);
  console.log('time!!!', time)
  let rates;

  if (time) {
    rates = await getRatesFromDatabase();
    if(JSON.stringify(rates) ===  JSON.stringify([])) {
      removeRatesFromDatabase();
      rates = await fetchRates(URL_ALL_RATES);
      addRates(rates);
      setRatesTime()
    }
  } else {
    removeRatesFromDatabase();
    rates = await fetchRates(URL_ALL_RATES);
    console.log('rates', rates);
    addRates(rates);
    setRatesTime()
  }  
  
  return rates;
}

export async function getGraphicRates(currencyCodes) {
  const time = isValidGraphicRatesTime(DAYS);
  let graphicRates;

  if (time) {
    graphicRates = await getGraphicRatesFromDatabase();

    if(JSON.stringify(graphicRates) ===  JSON.stringify([])) {
      removeGraphicRatesFromDatabase();
      const numbers = getNumbers();
      const dates = numbers.map((item) => graphDate(item));
      graphicRates = await Promise.all(dates.map(item => fetchRates(getGraphUrl(currencyCodes, item))))
        .then(rates => {
          const fetchRates = currencyCodes.map(itemRates => [].concat(...sortGraphicRates(rates, itemRates)));
          return fetchRates;
        });

      console.log('graphicRatesgraphicRates', graphicRates);
      addGraphicRates(graphicRates);
      setGraphicTime();
    }
  } else {
    removeGraphicRatesFromDatabase();
    const numbers = getNumbers();
    const dates = numbers.map((item) => graphDate(item));
    graphicRates = await Promise.all(dates.map(item => fetchRates(getGraphUrl(currencyCodes, item))))
      .then(rates => {
        const fetchRates = currencyCodes.map(itemRates => [].concat(...sortGraphicRates(rates, itemRates)));
        return fetchRates;
      });

    
    addGraphicRates(graphicRates);
    setGraphicTime();
  }

  return graphicRates;
}

export function dispatchInitalApp(rates, graphicRates) {
  return {
    type: INITIAL_APP,
    rates,
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
    console.log(`bynRate ${bynRate}`)
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

function sortGraphicRates(rates, code) {
  return rates !== undefined ? rates.map(item => item.filter(ii => ii.code === code)) : '';
}

async function fetchRates(url) {
  const rates = await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then(data => data.rates)
      
  rates.push(getBynRate())

  return rates;
}

function getBynRate() {
  return {
    rate: 1,
    iso: 'BYN',
    code: 1,
    quantity: 1,
    name: 'белорусский доллар'
  }
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

function createDb() {
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

function removeRatesFromDatabase() {
  let dbReq = indexedDB.open('ExchangeRates', 1);

  dbReq.onsuccess = async (event) => {
    const db = event.target.result;
    let transaction = db.transaction('rates', 'readwrite');
    let store = transaction.objectStore('rates');
    store.clear()
  }
}

function removeGraphicRatesFromDatabase() {
  let dbReq = indexedDB.open('ExchangeRates', 1);
  
  dbReq.onsuccess = async (event) => {
    const db = event.target.result;
    let transaction = db.transaction('graphicRates', 'readwrite');
    let store = transaction.objectStore('graphicRates');
    store.clear()
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

      transaction.objectStore('graphicRates').getAll().onsuccess = (event) => {
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

export function initalApp() {
  return async (dispatch, getState) => {
    console.time();
    let promise = new Promise(function(resolve, reject) {
      resolve(createDb())
    });

    promise.then(async data => {
      const currencyCodes = getState().rates.currencyCodes;
      const rates = await getAllRates();
      dispatch(changeFromRate(rates[0]));
      dispatch(changeToRate(rates[1]));
      const graphicRates = await getGraphicRates(currencyCodes);
      dispatch(dispatchInitalApp(rates, graphicRates));
      console.log('CONSOLE FR OM DB', console.timeEnd());
    })
  }
}

function isValidRatesTime(hours) {
  const localDate = localStorage.getItem('RatesDate');

  if (localDate !== null) {
    let startDate = new Date(localDate);
    let endDate = new Date();
    startDate.setHours(startDate.getHours() + hours);

    if (startDate > endDate) {
      return true;
    }
  }

  return false;
}


function isValidGraphicRatesTime(days) {
  const localDate = localStorage.getItem('GraphicDate');

  if (localDate !== null) {
    let startDate = new Date(localDate);
    let endDate = new Date();
    startDate.setDate(startDate.getDate() + days);

    if (startDate > endDate) {
      return true;
    }
  }

  return false;
}

function setGraphicTime() {
  const nowDate = new Date();
  const graphicDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
  localStorage.setItem('GraphicDate', graphicDate.toISOString());
}

function setRatesTime() {
  localStorage.setItem('RatesDate', new Date().toISOString());
}

export function changeFromRate(rate) {
  return (dispatch) => {
    dispatch(dispatchFromRate(rate));
  }
}

export function changeToRate(rate) {
  return (dispatch) => {
    dispatch(dispatchToRate(rate));
  }
}

export function dispatchFromRate(fromRate) {
  return {
    type: FROM_RATE,
    fromRate
  }
}

export function dispatchToRate(toRate) {
  return {
    type: TO_RATE,
    toRate
  }
}