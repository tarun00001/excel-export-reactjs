import React from 'react'
import Table from 'react-bootstrap/Table'

export const Customers = ({customers}) => {
    
    const CustomerRow = (customer,index) => {
        const [isSelected, setIsSelected] = React.useState(false);

        const handleChange = (event) => {
            
            setIsSelected(!isSelected) 
            console.log(isSelected) 
        }
    return (
        <tr key = {index} className='even'>
        <input type="checkbox" checked={isSelected} onChange={handleChange} />
        <td> {index + 1} </td>
        <td>{customer.firstName}</td>
        <td>{customer.lastName}</td>
        <td>{customer.email}</td>
        <td>{customer.address}</td>
        <td>{customer.zipcode}</td>
        </tr>
    )
}

const CustomerTable = customers.map((cust,index) => {
    
    return CustomerRow(cust,index)
    
}
                            )

const tableHeader = <thead className="bgvi">
                        <tr>
                        <th></th>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Zipcode</th>
                        </tr>
                    </thead>

                    return (
                        <Table striped bordered hover variant="dark">
                        {tableHeader}
                        <tbody>
                            {CustomerTable}
                        </tbody>
                    </Table>
                    )
                }


