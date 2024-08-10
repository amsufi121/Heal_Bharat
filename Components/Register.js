import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { adddata } from "../context/ContextProvider";

const Register = () => {
  const { udata, setUdata } = useContext(adddata);
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
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval, // Fix spread operator to correctly update state
        [name]: value,
      };
    });
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const { name, email, branch, year, prnnumber, add, desc } = inpval;

    // Ensure the URL is correct, especially if using a different port
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, branch, year, prnnumber, add, desc }),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      alert(data.error || "Error occurred");
      console.log("error:", data.error);
    } else {
      alert("Registration successful");
      setUdata(data);
      console.log("data added:", data);
    }
  };

  return (
    <div className="container">
      <NavLink to="/">Home</NavLink>

      <form className="mt-5" onSubmit={addinpdata}>
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              onChange={setdata}
              value={inpval.name}
              name="name"
              className="form-control"
              id="name"
              required
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              onChange={setdata}
              value={inpval.email}
              name="email"
              className="form-control"
              id="email"
              required
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="branch" className="form-label">
              Branch
            </label>
            <input
              type="text"
              onChange={setdata}
              value={inpval.branch}
              name="branch"
              className="form-control"
              id="branch"
              required
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="year" className="form-label">
              Year
            </label>
            <input
              type="text"
              onChange={setdata}
              value={inpval.year}
              name="year"
              className="form-control"
              id="year"
              required
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="prnnumber" className="form-label">
              Mobile Number
            </label>
            <input
              type="number"
              onChange={setdata}
              value={inpval.prnnumber} // Corrected from rollnumber to prnnumber
              name="prnnumber"
              className="form-control"
              id="prnnumber"
              required
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="add" className="form-label">
              Address
            </label>
            <input
              type="text"
              onChange={setdata}
              value={inpval.add}
              name="add"
              className="form-control"
              id="add"
              required
            />
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <textarea
              name="desc"
              onChange={setdata}
              value={inpval.desc}
              className="form-control"
              id="desc"
              cols="30"
              rows="5"
              required
            />
            <button type="submit" className="col-lg-12 btn btn-primary mt-3">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
