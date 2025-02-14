import React from 'react';
import { Container, Table,  Row, Col, Card } from 'react-bootstrap';

const HistoryTable = ({ history, onDelete }) => {
    return (
        <>
            {history.length > 0 && (
                <Container className="my-5">
                    <Row className="justify-content-center">
                        <Col lg={12}>
                            <Card className="shadow-lg border-10" style={{ borderColor: 'purple', borderWidth: '1px' }}>
                                
                                <Card.Header style={{ background: '#0e1117', color: 'white', textAlign: 'center' }}>
                                    <h2 className="mb-2" style={{ fontWeight: '800' }}>Query Board</h2>                                    
                                </Card.Header>
                                <hr />

                                <Card.Body className="p-4">                
                                    <Table striped bordered hover responsive className="table-sm">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>Location</th>
                                                <th>Bedroom</th>
                                                <th>Balcony</th>
                                                <th>Area</th>
                                                <th>Age</th>
                                                <th>Furnish</th>
                                                <th>Amenity</th>
                                                <th>Floor</th>
                                                <th>Prediction (App.)</th>
                                                <th>Price/sq ft(App.)</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.map((entry, index) => (
                                                <tr key={index} className="align-middle">
                                                    <td>{entry.query.location}</td>
                                                    <td>{entry.query.bedroom}</td>
                                                    <td>{entry.query.balcony}</td>
                                                    <td>{entry.query.area}</td>
                                                    <td>{entry.query.age}</td>
                                                    <td>{entry.query.furnish}</td>
                                                    <td>{entry.query.amenity}</td>
                                                    <td>{entry.query.floor}</td>
                                                    <td>
                                                        {/* {entry.prediction > 1
                                                            ? `${entry.prediction.toFixed(2)} Cr`
                                                            : `${(entry.prediction * 100).toFixed(2)} Lakh`} */}

                                                        <p className="text-center mt-4">
                                                            {/* when prediction in less than 1 cr */}
                                                            {(entry.prediction) > 1 ? `${(entry.prediction - 0.13).toFixed(2)} to ${(entry.prediction + .13).toFixed(2)} Cr` :

                                                                // when prediction less than 1 but upper limit > 1

                                                                entry.prediction + .13 > 1 ? `${(entry.prediction - 0.13).toFixed(2)} to ${(entry.prediction + .13).toFixed(2)} Cr`
                                                                    :
                                                                    // in lakh
                                                                    `${((entry.prediction - .13) * 100).toFixed(2)} to ${((entry.prediction + .13) * 100).toFixed(2)}  Lakh`}
                                                        </p>

                                                    </td>
                                                    <td>
                                                        {((entry.prediction * 10000000) / entry.query.area).toFixed(2)}
                                                    </td>
                                                    <td>
                                                        <i class="fa fa-trash" aria-hidden="true"
                                                            onClick={() => onDelete(index)}
                                                            style={{ fontSize: '1rem', padding: '0.5rem 1rem', color: 'red' }}
                                                        >
                                                        </i>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <p className="text-center" style={{ color: 'red' }} ><strong>Note: Please be aware that predictions may be less accurate when dealing with atypical or unusual inputs.</strong></p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default HistoryTable;
