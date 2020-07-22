import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactPaginate from 'react-paginate';

class DeleteClippingByCustomerComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            clippings: [],
            selectCustomer: '',
            offset: '',
            perPage: '',
            currentPage: 0,
            pageCount: ''

        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleSelectItem = this.handleSelectItem.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handleSelectItem(event) {
        this.setState({ selectCustomer: event.target.value });
        this.getAllClippingByCustomer(event.target.value);
    }

    componentDidMount() {
        this.listCustomer();
    }

    getAllClippingByCustomer(customerId) {

        if (customerId !== "") {

            fetch("http://localhost:8080/clipping/listClippingByCustomer/" + customerId + "/" + this.state.currentPage)
                .then((response) => response.json())
                .then((responseData) => {

                    this.setState({
                        clippings: responseData.content,
                        currentPage: responseData.pageable.pageNumber,
                        perPage: responseData.pageable.pageSize,
                        offset: responseData.pageable.offset,
                        pageCount: responseData.totalPages
                    });

                })
                .catch(error => {

                    console.log("ERROR = " + error);

                    this.setState({ clippings: [],
                                    pageCount: 0
                                  })
                    
                    toast.error("Clippings not found", {
                        position: toast.POSITION.TOP_LEFT
                    });
                })
        }

        this.setState({ clippings: [] });

    }
    z
    listCustomer() {

        fetch("http://localhost:8080/customer/listCustomer")
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ customers: responseData });
            })

            .catch(e => console.log("ERRO = " + e))

    }

    deleteClipping(clippingId) {

        fetch('http://localhost:8080/clipping/deleteClippingById/' + clippingId, {
            method: 'DELETE',
        })
            .then((responseData) => {

                this.setState({ clippings: this.state.clippings.filter(clipping => clipping.id !== clippingId) })

                toast.success("Clipping removed", {
                    position: toast.POSITION.TOP_LEFT
                });

            })
            .catch(e => console.log('ERRO = ' + e))

    }

    deleteConfirm = (clippingId) => {
        confirmAlert({
            message: 'Are you sure, to remove clipping?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteClipping(clippingId)
                },
                {
                    label: 'No',

                }
            ]
        })

    }

    deleteAllClippingByCustomer(customerId) {

        fetch('http://localhost:8080/clipping/deleteAllClippingByCustomer/' + customerId, {
            method: 'DELETE',
        })
            .then((responseData) => {

                this.setState({ clippings: [] });
                this.setState({ pageCount: 0})

                toast.success("All Clipping removed by customer ", {
                    position: toast.POSITION.TOP_LEFT
                });

            })
            .catch(e => console.log('ERRO = ' + e))

    }

    deleteConfirmAllClipping = (customerId) => {
        
        if (customerId !== "" && this.state.clippings.length !== 0) {

            confirmAlert({
                message: 'Are you sure, to remove all clippings?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => this.deleteAllClippingByCustomer(customerId)
                    },
                    {
                        label: 'No',

                    }
                ]
            })

        } else {
            toast.error("Clippings not found", {
                position: toast.POSITION.TOP_LEFT
            });
        }

    }

    handlePageClick = (event) => {

        const selectedPage = event.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getAllClippingByCustomer(this.state.selectCustomer)
        });

    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="jumbotron">
                            <h2 className="font-weight-bold text-warning">Delete clipping by customer</h2>
                            <div className="row">
                                <div className="form-group col-md-3 text-left">
                                    <label htmlFor="customers">Select Customer: </label>
                                    <select value={this.state.selectItem} onChange={this.handleSelectItem} className="form-control">
                                        <option value="">----- Select customer -----</option>
                                        {this.state.customers.map((item, index) => (
                                            <option key={index} value={item.id}>{item.customerName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-4 text-left">
                                    <button className="btn btn-danger" onClick={() => this.deleteConfirmAllClipping(this.state.selectCustomer)} >Delete all clipping by customer </button>
                                </div>
                            </div>
                            <div className="card-header p-1 pl-4 bg-primary text-white">
                                <h5 className="mb-0">Clipping</h5>
                            </div>
                            <ToastContainer autoClose={4000} />
                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive-sm">
                                        <table className="table table-sm my-2">
                                            <thead className="card-header">
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col" className="text-center">Name</th>
                                                    <th scope="col" className="text-center" >Date</th>
                                                    <th scope="col" className="text-center">Viewd</th>
                                                    <th scope="col" className="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.clippings.map(clippings => <tr key={clippings.id}>
                                                    <td>{clippings.id}</td>
                                                    <td className="text-left">{clippings.customer.customerName}</td>
                                                    <td>{clippings.clippingDate}</td>
                                                    <td><input className="text-center" value={clippings.viewed} readOnly /></td>
                                                    <td className="text-right">
                                                        <button className="btn btn-danger" onClick={() => this.deleteConfirm(clippings.id)} >Delete</button>
                                                    </td>
                                                </tr>)}
                                            </tbody>
                                        </table>
                                        <div>
                                            <ReactPaginate
                                                breakClassName={'page-item'}
                                                breakLinkClassName={'page-link'}
                                                containerClassName={'pagination'}
                                                pageClassName={'page-item'}
                                                pageLinkClassName={'page-link'}
                                                previousClassName={'page-item'}
                                                previousLinkClassName={'page-link'}
                                                nextClassName={'page-item'}
                                                nextLinkClassName={'page-link'}
                                                activeClassName={'active'}
                                                pageCount={this.state.pageCount}
                                                onPageChange={this.handlePageClick}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteClippingByCustomerComponent;