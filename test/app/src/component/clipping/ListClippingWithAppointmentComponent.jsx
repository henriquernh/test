import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';

class ListClippingWithAppointmentComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            clippingsWithAppointment: [],
            offset: '',
            perPage: '',
            currentPage: 0,
            pageCount: ''
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);

    }

    componentDidMount() {
        this.getListClippingWithAppointment();
    }

    getListClippingWithAppointment() {

        fetch("http://localhost:8080/clipping/listClippingWithAppointment/" + this.state.currentPage)
            .then((response) => response.json())
            .then((responseData) => {

                this.setState({
                    clippingsWithAppointment: responseData.content,
                    currentPage: responseData.pageable.pageNumber,
                    perPage: responseData.pageable.pageSize,
                    offset: responseData.pageable.offset,
                    pageCount: responseData.totalPages
                });

            })

            .catch(error => {

                console.log("ERROR = " + error);
                this.setState({ clippings: [] });

                toast.error("Clippings not found", {
                    position: toast.POSITION.TOP_LEFT
                });

            })
    }

    handlePageClick = (event) => {

        const selectedPage = event.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getListClippingWithAppointment()
        });

    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="jumbotron">
                            <h2 className="font-weight-bold text-warning">List clipping with appointment</h2>
                            <div className="card-header p-1 pl-4 bg-primary text-white">
                                <h5 className="mb-0">Clipping with appointment</h5>
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
                                                    <th scope="col" className="text-center" >Created at</th>
                                                    <th scope="col" className="text-center">Description</th>
                                                    <th scope="col" className="text-center">Due date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.clippingsWithAppointment.map(clippings => <tr key={clippings.id}>
                                                    <td>{clippings.id}</td>
                                                    <td className="text-left">{clippings.customer.customerName}</td>
                                                    <td>{clippings.appointmentCreatedAt}</td>
                                                    <td className="text-right">
                                                        {clippings.appointmentDescription}
                                                    </td>
                                                    <td className="text-right">
                                                        {clippings.appointmentDueDate}
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

export default ListClippingWithAppointmentComponent;