import { INIT_EXCHANGE_RATES, CONVERT_RATES, ADD_TO_FAVORITE, INITIAL_APP } from '../actions/actionTypes'

const initialState = {
  rates: null,
  fromRate: null,
  toRate: null,
  rate: 0,
  pageYOffset: 0,
  currencyCodes: [840, 978, 985],
  graphicRates: []
}

const rates = (state = initialState, action) => {
  switch(action.type) {
    case INIT_EXCHANGE_RATES: 
      return {
        ...state, 
        rates: action.rates
      }
    case CONVERT_RATES: 
      return {
        ...state,
        rate: action.rate
      }
    case ADD_TO_FAVORITE: 
      return {
        ...state,
        pageYOffset: action.pageYOffset,
        rates: action.rates
      }
    case INITIAL_APP: 
      return {
        ...state,
        graphicRates: action.graphicRates,
        rates: action.rates
      }
    default: 
      return state
  }
}

export default rates;