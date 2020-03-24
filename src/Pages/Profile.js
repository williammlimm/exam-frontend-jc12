import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../Support/API_URL';
import { fetchCart, fetchDataById } from '../Redux/Action';
import { connect } from 'react-redux';
import ProductCard from '../Components/ProductCard';
import { Jumbotron, Button , Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle} from 'reactstrap';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

class Profile extends Component {

    

    render() {
        return (
            <div>
               <form>
                    Current Password &nbsp;&nbsp;<input type='password' />
                    <br />
                    New Password &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='password' />
                    <br />
                    Confirm Password &nbsp;<input type='password' />
                    <br /><br />
                    <Button onClick={this.changePassword}>
                        Change Password
                    </Button>
               </form>
            </div>
        )
    }
}

export default Profile;