import React, { Component } from 'react';
import { Input, FormGroup, Label, Form, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { Login } from '../Redux/Action';
import { API_URL } from '../Support/API_URL'
import ProductCard  from '../Components/ProductCard' ;

class Transaction extends Component {
    state = {
        data: []
    }

    componentDidMount() {
        this.listTransactions()
        axios.get(`${API_URL}/transactions?userId=${localStorage.getItem('userId')}`)
            .then((res) => {
                this.setState({data: res.data})
            })
            .catch((err) => {
                console.log(err)
            })
    }

    listTransactions() {
        console.log(this.state.data)
        return(
            this.state.data.map((val) => {
                return(
                    <div style={{display: 'flex'}}>
                       <h4>{val.date}</h4>

                       {val.products.map((val2) => {
                           return(
                            <ProductCard
                                name={val2.name}
                                image={val2.image}
                                price={val2.price}
                                brand={val2.brand}
                            >
                            </ProductCard>
                           )
                       })}
                       
                    </div>
                )
            })
        )
    }



    render() {
        if(this.state.data) {
            return (
                <div>
                    <h1>Your Transaction History:</h1>
                    <div>
                        {this.listTransactions()}
                    </div>
                </div>
            )
        }
    }
}

export default Transaction