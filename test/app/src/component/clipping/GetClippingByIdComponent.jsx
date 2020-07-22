import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class GetClippingByIdComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            clipping: '',
            customer: '',
            value: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.getClippingById = this.getClippingById.bind(this);
        this.visualizedClipping = this.visualizedClipping.bind(this);

    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    getClippingById() {

        fetch("http://localhost:8080/clipping/getClippingById/" + this.state.value)
            .then((response) => response.json())
            .then((responseData) => {

                document.getElementById("formClipping").reset();

                this.setState({ customer: responseData.customer.customerName });
                this.setState({ clipping: responseData });
                console.log(responseData)

            })

            .catch(error => {

                console.log("ERROR = " + error);
                this.setState({ clippings: [] });

                toast.error("Clippings not found", {
                    position: toast.POSITION.TOP_LEFT
                });
            })
    }

    visualizedClipping() {

        if (this.state.clipping.viewed === true) {

            toast.error("clipping has already been updated", {
                position: toast.POSITION.TOP_LEFT
            });

        } else if (this.state.clipping.viewed === false) {

            fetch("http://localhost:8080/clipping/updateVisualizedClipping",
                {
                    method: 'PUT', body: JSON.stringify(this.state.clipping),
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
                })
                .then((response) => response.json())
                .then((responseData) => {

                    document.getElementById("formClipping").reset();
                    this.setState({ clipping: responseData });

                    toast.success("Clipping visualized", {
                        position: toast.POSITION.TOP_LEFT
                    });

                })

                .catch(error => {

                    console.log("ERROR = " + error);

                })

        }

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="jumbotron">
                            <h2 className="font-weight-bold text-warning">Get clipping by id</h2>
                            <div className="form-row">
                                <div className="col-auto my-1">
                                    <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control" placeholder="Id clipping" />
                                </div>
                                <div className="col-auto my-1">
                                    <button type="submit" onClick={this.getClippingById} className="btn btn-success">Search</button>
                                </div>
                                <div className="col-auto my-1">
                                    <button type="submit" onClick={this.visualizedClipping} className="btn btn-success"  >Visualized clipping</button>
                                </div>
                            </div>
                            <div className="card-header p-1 pl-4 bg-primary text-white">
                                <h5 className="mb-0">Result clipping by id</h5>
                            </div>
                            <ToastContainer autoClose={4000} />
                            <form id="formClipping">
                                <div className="form-row">
                                    <div className="form-group col-md-6 text-left">
                                        <label htmlFor="customerName">Customer name:</label>
                                        <input type="text" name="customerName" value={this.state.customer} disabled className="form-control" readOnly />
                                    </div>
                                    <div className="form-group col-md-3 text-left">
                                        <label htmlFor="clippingDate">Clipping date:</label>
                                        <input type="text" name="clippingDate" value={this.state.clipping.clippingDate} disabled className="form-control" readOnly />
                                    </div>
                                    <div className="form-group col-md-3 text-left">
                                        <label htmlFor="viewed">Viewed:</label>
                                        <input type="text" name="viewed" value={this.state.clipping.viewed} disabled className="form-control" readOnly />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12 text-left">
                                        <label htmlFor="clippingMatter">Matter:</label>
                                        <textarea type="textArea" name="clippingMatter" value={this.state.clipping.clippingMatter}
                                            disabled className="form-control" readOnly rows="5">
                                        </textarea>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4 text-left">
                                        <label htmlFor="classificationType">Classification type:</label>
                                        <input type="text" name="classificationType" value={this.state.clipping.classificationType} disabled className="form-control" readOnly />
                                    </div>
                                    <div className="form-group col-md-4 text-left">
                                        <label htmlFor="classifiedDate">Classified date:</label>
                                        <input type="text" name="classifiedDate" value={this.state.clipping.classifiedDate} disabled className="form-control" readOnly />
                                    </div>
                                    <div className="form-group col-md-4 text-left">
                                        <label htmlFor="classifiedTime">Classified time:</label>
                                        <input type="text" name="classifiedTime" value={this.state.clipping.classifiedTime} disabled className="form-control" readOnly />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4 text-left">
                                        <label htmlFor="important">Important:</label>
                                        <input type="text" name="important" value={this.state.clipping.important} disabled className="form-control" readOnly />
                                    </div>
                                </div>
                                <div>
                                    <div className="card-header p-1 pl-4 bg-primary text-white">
                                        <h5 className="mb-0">Appointment</h5>
                                    </div>
                                    <div className="card-body">

                                        <div className="form-row">
                                            <div className="form-group col-md-6 text-left">
                                                <label htmlFor="appointmentCreatedAt">Created at:</label>
                                                <input type="text" name="appointmentCreatedAt" value={this.state.clipping.appointmentCreatedAt} disabled className="form-control" readOnly />
                                            </div>
                                            <div className="form-group col-md-6 text-left">
                                                <label htmlFor="appointmentDueDate">Due date:</label>
                                                <input type="text" name="appointmentDueDate" value={this.state.clipping.appointmentDueDate} disabled className="form-control" readOnly />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-12 text-left">
                                                <label htmlFor="clippingMatter">Description:</label>
                                                <textarea type="textArea" name="appointmentDescription"
                                                    disabled className="form-control" readOnly rows="5"
                                                    value={this.state.clipping.appointmentDescription}>
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="card-header p-1 pl-4 bg-primary text-white">
                                        <h5 className="mb-0">Notification</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-row">
                                            <div className="form-group col-md-6 text-left">
                                                <label htmlFor="notificationCreatedAt">Created at:</label>
                                                <input type="text" name="notificationCreatedAt" value={this.state.clipping.notificationCreatedAt} disabled className="form-control" readOnly />
                                            </div>
                                            <div className="form-group col-md-6 text-left">
                                                <label htmlFor="notificationViewed">Viewed:</label>
                                                <input type="text" name="notificationViewed" value={this.state.clipping.notificationViewed} disabled className="form-control" readOnly />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-12 text-left">
                                                <label htmlFor="notificationDescription">Description:</label>
                                                <textarea type="textArea" name="notificationDescription"
                                                    disabled className="form-control" readOnly rows="5"
                                                    value={this.state.clipping.notificationDescription}>
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GetClippingByIdComponent;