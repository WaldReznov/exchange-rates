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