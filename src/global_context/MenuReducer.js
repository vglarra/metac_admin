export default (state, action) => {
    switch(action.type) {
      case 'NOT_USED':
        return {
          ...state,
          transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
        }
      case 'UPDATE_LENGTH':
        return {
          ...state,
          menuLenghtSize: action.payload
        }
      default:
        return state;
    }
  }