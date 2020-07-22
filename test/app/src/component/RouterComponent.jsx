import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../component/Home';
import CreateClippingComponent from '../component/clipping/CreateClippingComponent';
import ListClippingByCustomerComponent from '../component/clipping/ListClippingByCustomerComponent';
import GetClippingByIdComponent from '../component/clipping/GetClippingByIdComponent';
import ListClippingWithAlertComponent from '../component/clipping/ListClippingWithAlertComponent';
import ListClippingWithAppointmentComponent from '../component/clipping/ListClippingWithAppointmentComponent';
import DeleteClippingByCustomerComponent from '../component/clipping/DeleteClippingByCustomerComponent';

import Dropdown from 'react-bootstrap/Dropdown'

import 'bootstrap/dist/css/bootstrap.min.css';

const AppRouter = () => {

    return (
        <div className="router-component">
            <Router>
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-dark border-bottom box-shadow">
                    <a className="container my-0 mr-md-auto font-weight-normal h3 text-white" href="/">Test</a>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Menu
                            </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/save-clipping">
                                Create clipping
                                </Dropdown.Item>
                            <Dropdown.Item href="/delete-clipping-by-customer">
                                Delete clippings by customer
                                </Dropdown.Item>  
                            <Dropdown.Item href="/list-clipping-by-customer">
                                List clipping
                                </Dropdown.Item>
                            <Dropdown.Item href="/get-clipping-by-id">
                                Get clipping
                                </Dropdown.Item>
                            <Dropdown.Item href="/list-clipping-with-alert">
                                Get clippings with alert
                                </Dropdown.Item>
                            <Dropdown.Item href="/list-clipping-with-appointment">
                                Get clippings with appointment
                                </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="pricing-header px-3 py-3 pt-md-4 pb-md-4 mx-auto text-center">

                    <Switch>

                        <Route path="/" exact component={Home} />

                        <Route path="/save-clipping" exact component={CreateClippingComponent} />

                        <Route path="/delete-clipping-by-customer" exact component={DeleteClippingByCustomerComponent} />

                        <Route path="/list-clipping-by-customer" exact component={ListClippingByCustomerComponent} />

                        <Route path="/get-clipping-by-id" exact component={GetClippingByIdComponent} />

                        <Route path="/list-clipping-with-alert" exact component={ListClippingWithAlertComponent} />

                        <Route path="/list-clipping-with-appointment" exact component={ListClippingWithAppointmentComponent} />

                    </Switch>

                </div>

            </Router>
            <div className="container">
                <footer className="pt-4 my-md-5 pt-md-5 border-top">
                    <div className="row">
                        <div className="container">
                            <p className="m-0 text-center">Copyright &copy; Test</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default AppRouter;