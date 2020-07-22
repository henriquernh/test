import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const formatDate = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
}
const date = new Intl.DateTimeFormat(formatDate, []).format(new Date());

class AddUserComponentYup extends Component {

    constructor(props) {
        super(props)

        this.clippingMatter = React.createRef();
        this.customer = React.createRef();
        this.classificationType = React.createRef();
        this.classifiedDate = React.createRef();
        this.classifiedTime = React.createRef();
        this.important = React.createRef();

        this.appointmentDueDate = React.createRef();
        this.appointmentDescription = React.createRef();

        this.notificationDescription = React.createRef();
        this.notificationCreatedAt = React.createRef();

        this.state = {

            errors: [],
            customers: [],
            selectItem: '',
            disabledClippingAppointment: true,
            disableClippingAlert: true,
            important: false

        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleSelectItem = this.handleSelectItem.bind(this);
        this.handleSelectClassificationType = this.handleSelectClassificationType.bind(this);
        this.handleSelectImportant = this.handleSelectImportant.bind(this);

    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({ errors: [] });

        const clippingMatter = this.clippingMatter.current.value;
        var customer = this.customer.current.value;
        const classificationType = this.classificationType.current.value
        const classifiedDate = this.classifiedDate.current.value
        const classifiedTime = this.classifiedTime.current.value
        const important = this.important.current.value
        const appointmentDueDate = this.appointmentDueDate.current.value
        const appointmentDescription = this.appointmentDescription.current.value
        const notificationDescription = this.notificationDescription.current.value
        const notificationCreatedAt = this.notificationCreatedAt.current.value

        const errors = this.handleValidation(clippingMatter, customer, classificationType, important,
            appointmentDueDate, appointmentDescription,
            notificationDescription, notificationCreatedAt);

        if (errors.length > 0) {
            return this.setState({ errors });
        }

        for (let index = 0; index < this.state.customers.length; index++) {
            if (this.state.customers[index].id == customer) {
                customer = this.state.customers[index];
            }
        }

        let clipping = {
            clippingDate: new Date(),
            customer: customer,
            clippingMatter: clippingMatter,
            classificationType: classificationType,
            classifiedDate: classifiedDate,
            classifiedTime: classifiedTime,
            important: this.important.current.value,
            appointmentDueDate: appointmentDueDate,
            appointmentDescription: appointmentDescription,
            notificationDescription: notificationDescription,
            notificationCreatedAt: notificationCreatedAt,

        };

        fetch('http://localhost:8080/clipping/saveClipping',
            {
                method: 'POST', body: JSON.stringify(clipping),
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseData) => {

                toast.success("Clipping added", {
                    position: toast.POSITION.TOP_LEFT
                });

                this.setState({ disabledClippingAppointment: true });
                this.setState({ disableClippingAlert: true });

                document.getElementById("formClipping").reset();
                document.getElementById("important").value = "false";

            })
            .catch(e => console.log('ERRO = ' + e));

    }

    handleValidation = (clippingMatter, customer, classificationType, important,
        appointmentDueDate, appointmentDescription,
        notificationDescription, notificationCreatedAt) => {

        const errors = [];

        if (clippingMatter.length === 0) {
            errors.push("Matter: Cannot be empty");
        }

        if (customer.length === 0) {
            errors.push("Customer: Select a customer");
        }

        if (classificationType === "HEARING" && appointmentDescription.length === 0) {
            errors.push("Appointment Description: Cannot be empty");
        }

        if (classificationType === "HEARING" && appointmentDueDate.length !== 10) {
            errors.push("Appointment Due Date: Invalid date");
        }

        if (important === "true" && notificationDescription.length === 0) {
            errors.push("Notification Description: Cannot be empty");
        }

        if (important === "true" && notificationCreatedAt.length === 0) {
            errors.push("Notification Created At: Invalid date");
        }

        return errors;

    }

    handleSelectItem(e) {
        this.setState({ selectItem: e.target.value });
    }


    handleSelectClassificationType(e) {
        if (e.target.value === "HEARING") {
            this.setState({ disabledClippingAppointment: false });
        } else {
            this.setState({ disabledClippingAppointment: true });
            this.cleanInputsAppointment();
        }
    }

    cleanInputsAppointment() {
        document.getElementById("appointmentDescription").value = "";
        document.getElementById("appointmentDueDate").value = "";
    }

    handleSelectImportant(e) {

        if (e.target.checked === true) {
            this.setState({ disableClippingAlert: false });
            this.setState({ important: true });
        } else {
            this.setState({ disableClippingAlert: true });
            this.setState({ important: false });
            document.getElementById("notificationDescription").value = "";
            document.getElementById("notificationCreatedAt").value = "";
        }

    }

    componentDidMount() {
        this.listCustomer();
    }

    listCustomer() {

        fetch("http://localhost:8080/customer/listCustomer")
            .then((response) => response.json())
            .then((responseData) => {

                this.setState({ customers: responseData });

            })

            .catch(e => console.log("ERRO = " + e))

    }


    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="jumbotron">
                            <h2 className="font-weight-bold text-warning">Create clipping</h2>

                            <form id="formClipping" onSubmit={this.handleSubmit}>

                                <ToastContainer autoClose={4000} />

                                <div className="card-header p-1 pl-4 bg-primary text-white">
                                    <h5 className="mb-0">Clipping</h5>
                                </div>

                                <div className="mt-2">
                                    {errors.map(error => <p className='text-danger' key={error}>{error}</p>)}
                                </div>

                                <div id="divNofication" className="card-body">
                                    <div className="form-row mt-4">
                                        <div className="form-group col-md-6 text-left">
                                            <label htmlFor="customers">Select customer: </label>
                                            <select value={this.state.selectItem} onChange={this.handleSelectItem} ref={this.customer} className="form-control">
                                                {this.state.customers.map((item, index) => (
                                                    <option key={index} value={item.id}>{item.customerName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6 text-left">
                                            <label htmlFor="clippingDate">Clipping date:</label>
                                            <input type="text" name="clippingDate" value={date} disabled className="form-control is-valid" />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-12 text-left">
                                            <label htmlFor="clippingMatter">Matter:</label>
                                            <input type="text" name="clippingMatter" placeholder="Matter" autoFocus="autoFocus"
                                                ref={this.clippingMatter} className={'form-control'} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-4 text-left">
                                            <label htmlFor="classificationType">Classification type:</label>
                                            <select as="select" name="classificationType" ref={this.classificationType} onChange={this.handleSelectClassificationType} className="form-control">
                                                <option value="DEADLINE">Deadline</option>
                                                <option value="HEARING">Hearing</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-4 text-left">
                                            <label htmlFor="classifiedDate">Classified date:</label>
                                            <input
                                                ref={this.classifiedDate}
                                                name="classifiedDate"
                                                label="classiFiedDate"
                                                type="date"
                                                className="form-control"
                                                id="classifiedDate"
                                            />
                                        </div>
                                        <div className="form-group col-md-4 text-left">
                                            <label htmlFor="classifiedTime">Classified time:</label>
                                            <input ref={this.classifiedTime}
                                                type="time"
                                                name="classifiedTime"
                                                placeholder="Time"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-4 text-left">
                                            <div>
                                                <label htmlFor="viewed">Inportante:</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input onChange={this.handleSelectImportant}
                                                    ref={this.important}
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="important"
                                                    value={this.state.important}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-header p-1 pl-4 bg-primary text-white">
                                    <h5 className="mb-0">Appointment</h5>
                                </div>
                                <div className="card-body">
                                    <div className="form-row">
                                        <div className="form-group col-md-12 text-left">
                                            <label htmlFor="appointmentDescription">Description:</label>
                                            <input
                                                ref={this.appointmentDescription}
                                                disabled={this.state.disabledClippingAppointment}
                                                type="text"
                                                name="appointmentDescription"
                                                placeholder="Description"
                                                className="form-control"
                                                id="appointmentDescription"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-3 text-left">
                                            <label htmlFor="appointmentDueDate">Due date</label>
                                            <input disabled={this.state.disabledClippingAppointment}
                                                ref={this.appointmentDueDate}
                                                name="appointmentDueDate"
                                                label="due Date"
                                                type="date"
                                                className="form-control"
                                                id="appointmentDueDate"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-header p-1 pl-4 bg-primary text-white">
                                    <h5 className="mb-0">Notification</h5>
                                </div>
                                <div id="divNofication" className="card-body">
                                    <div className="form-row">
                                        <div className="form-group col-md-12 text-left">
                                            <label htmlFor="notificationDescription">Description:</label>
                                            <input
                                                ref={this.notificationDescription}
                                                disabled={this.state.disableClippingAlert}
                                                type="text"
                                                id="notificationDescription"
                                                name="notificationDescription"
                                                placeholder="Description"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-3 text-left">
                                            <label htmlFor="notificationCreatedAt">Created at</label>
                                            <input disabled={this.state.disableClippingAlert}
                                                ref={this.notificationCreatedAt}
                                                type="date"
                                                id="notificationCreatedAt"
                                                name="notificationCreatedAt"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6 text-left">
                                        </div>
                                        <div className="form-group col-md-6 text-left">
                                            <button className="btn btn-success btn-lg btn-block">Save</button>
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

export default AddUserComponentYup;