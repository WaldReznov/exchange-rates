import { INIT_EXCHANGE_RATES, CONVERT_RATES, ADD_TO_FAVORITE } from "./actionTypes";

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
    
    console.log('rates', [...rates]);
    
    dispatch(initExchangeRates(rates))
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

    dispatch(addToFavoriteDispatch(updatedRates))
  }
}

export function addToFavoriteDispatch(rates) {
  return {
    type: ADD_TO_FAVORITE,
    rates
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
  return async dispatch => {
    const ratesId = [19, 145, 190];
    const numbers = getNumbers();
    const dates = numbers.map((item) => graphDate(item));
    const startDate = dates.slice(0, 1);
    const endDate = dates.slice(-1);
    const rates = await fetch(URL_ALL_rates)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.rates;
      })
    
    console.log('rates', [...rates]);
    
    dispatch(initExchangeRates(rates))
  }
}

function getNumbers() {
  const numbers = [];

  for(let i = 0; i < 31; i++) {
    numbers.push(i);
  }

  return numbers;
}

function graphDate(day = null) {
  const d = new Date();

  if(day !== null) {
    d.setDate(d.getDate() - day)
  }
  
  const curr_date = d.getDate();
  const curr_month = d.getMonth() + 1;
  const curr_year = d.getFullYear();

  return `${curr_year}-${curr_month}-${curr_date}`
}

function getGraphUrl(id, startDate, endDate) {
  return `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${id}?startDate=${startDate}&endDate=${endDate}`
}