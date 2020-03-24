import Axios from "axios"
import { API_URL } from "../../Support/API_URL"

export const fetchCart = (userId) => {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_DATA_CART_START'
    })
    Axios.get(`${API_URL}/carts?userId=${userId}&status=oncart`)
      .then((res) => {
        console.log(res.data)
        dispatch({
          type: 'FETCH_DATA_CART_SUCCESS',
          payload: res.data
        })
      })

      .catch((err) => {
        dispatch({
          type: 'FETCH_DATA_CART_FAILED'
        })
      })
  }
}
