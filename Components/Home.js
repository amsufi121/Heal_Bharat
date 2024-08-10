import React, { useEffect, useState, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import { adddata, updatedata, deldata } from "../context/ContextProvider";

const Home = () => {
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const { udata, setUdata } = useContext(adddata);
  const { updata, setUPdata } = useContext(updatedata);
  const { dltdata, setDLTdata } = useContext(deldata);

  const getdata = async () => {
    try {
      // Ensure the URL is correct, especially if using a different port
      const res = await fetch("http://localhost:3000/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        console.log("error:", data.error);
      } else {
        setUserdata(data);
        console.log("get data:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("User Deleted");
      setDLTdata(deletedata);
      getdata();
    }
  };

  return (
    <>
      {udata && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>{udata.name}</strong>  Added Successfully!!
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      {updata && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>{updata.name}</strong>  Updated Successfully!!
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      {dltdata && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>{dltdata.name}</strong>  Deleted Successfully!!
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <NavLink to="/register" className="btn btn-primary">
              Add data
            </NavLink>
          </div>
          <table className="table">
            <thead>
              <tr className="table-info">
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Branch</th>
                <th scope="col">Mobile No.</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {getuserdata.length > 0 ? (
                getuserdata.map((user, index) => (
                  <tr key={user._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.branch}</td>
                    <td>{user.prnnumber}</td>
                    <td className="d-flex justify-content-between">
                      <NavLink to={`view/${user._id}`}>
                        <button className="btn btn-success">
                          <RemoveRedEyeIcon />
                        </button>
                      </NavLink>
                      <NavLink to={`edit/${user._id}`}>
                        <button className="btn btn-warning">
                          <CreateIcon />
                        </button>
                      </NavLink>

                      <button
                        className="btn btn-danger"
                        onClick={() => deleteuser(user._id)}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
