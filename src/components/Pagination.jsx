import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Pagination = () => {

    const center = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    }

    const api = 'https://dummyjson.com/users?limit=0';

    const [tableData, setTableData] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [rowPerPage, setRowPerPage] = useState(10);

    const indexOfLastItem = currPage * rowPerPage;
    const indexOfFirstItem = indexOfLastItem - rowPerPage;
    const currItems = tableData?.slice(indexOfFirstItem, indexOfLastItem);

    const totalBtn = tableData.length > 0 ? Math.ceil(tableData.length / rowPerPage) : 0;

    useEffect(() => {
        axios.get(api).then((res) => {
            console.log('totalBtn', totalBtn);
            setTableData(res.data.users);

        }).catch((error) => {
            console.log("error", error);
        });
    }, []);

    return (
        <div style={center}>
            <table border={1}>
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {currItems?.map((item, index) => (
                        <tr key={index}>
                            <td>{indexOfFirstItem + index + 1}</td>
                            <td>{item.firstName} {item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.gender}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button
                    onClick={() => setCurrPage(currPage - 1)}
                    disabled={currPage === 1}
                >Prev</button>

                {totalBtn > 0 && Array.from({ length: totalBtn }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrPage(index + 1)}
                        disabled={currPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrPage(currPage + 1)}
                    disabled={currPage == totalBtn}
                >Next</button>
            </div>
        </div>
    )
}

export default Pagination
