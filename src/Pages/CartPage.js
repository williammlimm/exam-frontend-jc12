import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../Support/API_URL';
import { fetchCart, fetchDataById } from '../Redux/Action';
import { connect } from 'react-redux';
import ProductCard from '../Components/ProductCard';
import { Jumbotron, Button , Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle} from 'reactstrap';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const initialState = {
  productsInCart: [],
  selectedSize: []
}



class Cart extends Component {
  state = {
    data: [],
    productsInCart: [],
    userId: '',
    show: false,
    selectedSize: []
  }

  componentDidMount() {
    this.renderCardProduct()
    this.renderProduct()
  }

  componentDidUpdate() {
    this.renderProduct()
    // this.resetState()
  }

  componentWillReceiveProps (nextProps) {
    if(this.props.carts) {
      if (this.props.carts !== nextProps.carts) {
        nextProps.carts.map((val) => {
          // console.log(val.selectedSize, 'ini size')
          // console.log(this.state.selectedSize)
          Axios.get(`${API_URL}/products/${val.productId}`)
            .then((res) => {
              this.setState({selectedSize: [...this.state.selectedSize, val.selectedSize]})
              this.setState({productsInCart: this.state.productsInCart.concat(res.data)})
            })
            .catch((err) => {
              console.log(err)
            })
        })
      } 
    }
  }

  resetState = () => {
    this.setState({...initialState})
  }

  addToPaymentHistory() {

  }

  renderCardProduct = () => {
    let localUser = localStorage.getItem('userId')
    this.props.fetchCart(localUser)
  }
  
  deleteModal = () => {
    Axios.delete()
  }
  

  renderProduct = () => {
    return this.state.productsInCart.map((val) => {
      return(
        <div>
          <ProductCard
            name={val.name}
            image={val.image}
            price={val.price}
            brand={val.brand}
          >
          </ProductCard>
        </div>
      )
    })
  }

  checkout = () =>{
    let date = new Date()
    let objTransaction = {
      date: date,
      products: this.state.productsInCart,
      userId: localStorage.getItem('userId')
    }
    if(this.state.productsInCart.length > 0 && localStorage.getItem('userId')) {
      Axios.post(`${API_URL}/transactions`, objTransaction)
        .then((res) => {
          if(res.status == '201') {
           this.props.carts.map((val) => {
             Axios.delete(`${API_URL}/carts/${val.id}`)
              .then((res) => {
                Swal.fire('Checkout Successful.')
                console.log(res)
                this.resetState()
              })
              .catch((err) => {
                console.log(err)
              })
             }
           )}
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please add items into the cart!'
      })
    }
  }

  size() {
    console.log(this.state.selectedSize)
    return (
      this.state.selectedSize.map((val) => {
        return (
          <div>
            <strong>Size: {val}</strong> &nbsp;
          </div>
        )
      })
    )
  }

 
  render() {
    return (
      <div>
        <h1>Your Cart:</h1>
        <div style={{display: 'flex'}}>
          {this.size()}
          {this.renderProduct()}  
        </div>
       
          <Button outline color="secondary" onClick={this.checkout}>Checkout</Button>
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  // console.log(state, 'INI STATEEEEEEEEEEEEEEEEEEE')
  // console.log(state.cart.carts)
  // console.log(state)
  return {
    carts: state.cart.carts
    // carts: state.cart.
  }
}

export default connect(mapStatetoProps, { fetchCart,fetchDataById })(Cart)