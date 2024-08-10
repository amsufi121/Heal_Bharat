import { useState, useEffect, useContext } from "react";
import React from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { updatedata } from "../context/ContextProvider";
const Edit = () => {
  const { updata, setUPdata } = useContext(updatedata);

  const navigate = useNavigate("");

  const [inpval, setINP] = useState({
    name: "",
    email: "",
    branch: "",
    year: "",
    prnnumber: "",
    add: "",
    desc: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    try {
      const res = await fetch(`/getuser/${id}`, {
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
        setINP(data);
        console.log("get data:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();

    const { name, email, branch, year, prnnumber, add, desc } = inpval;

    try {
      const res2 = await fetch(`/updateuser/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          branch,
          year,
          prnnumber,
          add,
          desc,
        }),
      });

      const data2 = await res2.json();
      console.log(data2);

      if (res2.status === 422 || !data2) {
        alert("Fill the Data");
      } else {
        alert("Data Updated");
        navigate("/");
        setUPdata(data2);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="container">
      <NavLink to="/">home2</NavLink>

      <form className="mt-5">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              onChange={setdata}
              value={inpval.name}
              name="name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby=""
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              onChange={setdata}
              value={inpval.email}
              name="email"
              className="form-control"
              id="exampleInputEmail1"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else
            </div>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Branch
            </label>
            <input
              type="text"
              onChange={setdata}
              value={inpval.branch}
              name="branch"
              className="form-control"
              id="exampleInputEmail1"
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Year
            </label>
            <input
              type="text"
              onChange={setdata}
              value={inpval.year}
              name="year"
              className="form-control"
              id="exampleInputEmail1"
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              PRN Number
            </label>
            <input
              type="number"
              onChange={setdata}
              value={inpval.prnnumber}
              name="prnnumber"
              className="form-control"
              id="exampleInputEmail1"
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Address
            </label>
            <input
              type="text"
              onChange={setdata}
              value={inpval.add}
              name="add"
              className="form-control"
              id="exampleInputEmail1"
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Description
            </label>
            <textarea
              name="desc"
              onChange={setdata}
              value={inpval.desc}
              className="form-control"
              id=""
              cols="30"
              rows="5"
            ></textarea>
            <button
              type="submit"
              onClick={updateuser}
              className="col-lg-12 btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Edit;
