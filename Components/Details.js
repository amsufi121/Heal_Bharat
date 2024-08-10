import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MailIcon from "@mui/icons-material/Mail";
import PlaceIcon from "@mui/icons-material/Place";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink, useParams, useNavigate } from "react-router-dom";

const Details = () => {
  const { id } = useParams("");
  console.log(id);

  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  const navigate = useNavigate("");

  const getdata = async () => {
    try {
      // Ensure the URL is correct, especially if using a different port
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
        setUserdata(data);
        console.log("get data:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Add dependency array to avoid repeated calls

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
      navigate("/");
    }
  };

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome CRUD</h1>

      <Card sx={{ minWidth: 600 }}>
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edituser${getuserdata._id}`}>
              <button className="btn btn-primary mx-2">
                <CreateIcon />
              </button>
            </NavLink>

            <button
              className="btn btn-danger "
              onClick={() => deleteuser(getuserdata._id)}
            >
              <DeleteIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md6 col-12">
              <img src="/profile.png" style={{ width: 50 }} alt="profile" />
              <h4 className="mt-3">
                Name : <span>{getuserdata.name}</span>
              </h4>
              <h4 className="mt-3">
                <MailIcon />
                Email: <span>{getuserdata.email}</span>
              </h4>
              <h4 className="mt-3">
                <PlaceIcon />
                Address: <span>{getuserdata.add}</span>
              </h4>
            </div>
            <div className="right_view col-lg-6 col-md6 col-12">
              <h4 className="mt-5">
                Branch : <span>{getuserdata.branch}</span>
              </h4>
              <h4 className="mt-3">
                Year : <span>{getuserdata.year}</span>
              </h4>
              <h4 className="mt-3">
                Mobile Number : <span>{getuserdata.prnnumber}</span>
              </h4>
              <h4 className="mt-3">
                Description : <span>{getuserdata.desc}</span>
              </h4>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
