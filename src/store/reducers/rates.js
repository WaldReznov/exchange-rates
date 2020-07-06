import { INIT_EXCHANGE_RATES, CONVERT_RATES, ADD_TO_FAVORITE, INIT_GRAPHIC_RATES } from '../actions/actionTypes'

const initialState = {
  rates: null,
  fromRate: null,
  toRate: null,
  rate: 0,
  pageYOffset: 0,
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
    case INIT_GRAPHIC_RATES: 
      return {
        ...state,
        graphicRates: action.graphicRates
      }
    default: 
      return state
  }
}

export default rates;