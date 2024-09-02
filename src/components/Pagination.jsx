import axios from "axios";
import React, { useEffect, useState } from "react";

const Pagination = () => {
  const center = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  const api = "https://dummyjson.com/users?limit=0";

  const [tableData, setTableData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);

  const [inputVal, setInputVal] = useState(1);

  const indexOfLastItem = currPage * rowPerPage;
  const indexOfFirstItem = indexOfLastItem - rowPerPage;
  const currItems = tableData?.slice(indexOfFirstItem, indexOfLastItem);

  const totalBtn =
    tableData.length > 0 ? Math.ceil(tableData.length / rowPerPage) : 0;

  useEffect(() => {
    axios
      .get(api)
      .then((res) => {
        console.log("totalBtn", totalBtn);
        setTableData(res.data.users);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const gotoPage = () => {
    console.log("click");
    setCurrPage(inputVal);
  };

  const nextBtn = () => {
    setCurrPage(currPage + 1);
    setInputVal(currPage + 1);
  };

  const prevBtn = () => {
    setCurrPage(currPage - 1);
    setInputVal(currPage - 1);
  };

  const totalPagesBtn = (index) => {
    setCurrPage(index + 1);
    setInputVal(index + 1);
  };

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
              <td>
                {item.firstName} {item.lastName}
              </td>
              <td>{item.email}</td>
              <td>{item.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-bottom">
        <div>
          <p>{`Showing page no ${currPage} of total ${totalBtn}`}</p>
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button type="submit" onClick={gotoPage}>
            Go
          </button>
        </div>

        <div className="pagination">
          <button onClick={prevBtn} disabled={currPage === 1}>
            Prev
          </button>
          <button onClick={nextBtn} disabled={currPage == totalBtn}>
            Next
          </button>
          {totalBtn > 0 &&
            Array.from({ length: totalBtn }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => totalPagesBtn(index)}
                disabled={currPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
