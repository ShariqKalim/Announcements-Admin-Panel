import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Adminpanel = () => {
  const [info, setInfo] = useState([]);
  const [card, setCard] = useState({
    announce: "",
    select: "",
    date: "",
  });
  const onTextFieldChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    toast.success("Added Successfully", {
      position: "top-center",
      autoClose: 1000,
    });
    try {
      await axios.post(process.env.React_App_API_LINK, card);

      setTimeout(() => {
        history.push("/");
      }, 1000);

      setTimeout(() => {
        history.push("/adminpanel");
      }, 1010);
    } catch (err) {
      console.log(err);
    }
  };
  const history = useHistory();
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
    } else {
      history.push("/");
    }
    const getApiData = async () => {
      try {
        const res = await axios.get(process.env.React_App_API_LINK);
        setInfo(res.data.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    getApiData();
  }, []);
  const logout = () => {
    sessionStorage.removeItem("token");
    history.push("/");
  };

  const handleDelete = async (_id) => {
    await axios.delete(process.env.React_App_API_LINK + "/" + _id);
    let newinfo = info.filter((item) => {
      return item._id !== _id;
    });
    setInfo(newinfo);
    toast.error("deleted successfully", {
      position: "top-center",
      autoClose: 1000,
    });
  };
  return (
    <>
      <div className="flex">
        <div
          className="w-80 shadow-2xl h-screen p-10 flex flex-col"
          id="sidebar"
        >
          <h6 className="text-md text-center border-4 p-2 font-medium text-gray-900 ">
            User - Announcement Admin
          </h6>
          <button
            onClick={logout}
            className="w-full text-center my-10 bg-gradient-to-r from-gray-700 to-gray-500 p-2 text-white font-medium tracking-wide text-lg rounded"
          >
            Logout
          </button>
          <div className="border-4 p-5 text-center text-gray-900 font-medium">
            <h6>contact details</h6>
            <p className="text-sm my-4">
              email - contactsmartcollege@gmail.com
            </p>
            <p>or contact Head Admin</p>
          </div>
        </div>
        <div className="w-full p-5">
          <h1 className="mb-10 w-full p-2 text-white font-medium tracking-wide text-md bg-gradient-to-r from-blue-600 to-blue-400">
            Welcome to Admin Panel
            <button
              onClick={logout}
              id="logout_responsive"
              className=" bg-white font-semibold w-14 text-sm p-1  rounded text-black float-right"
            >
              Logout
            </button>
          </h1>
          <form>
            <TextField
              id="outlined-multiline-static"
              label="Announcement"
              multiline
              rows={6}
              variant="outlined"
              className="w-full "
              onChange={(e) => onTextFieldChange(e)}
              name="announce"
            />
            <select
              className="border-4 w-72 mt-5 p-2 cursor-pointer"
              onChange={(e) => onTextFieldChange(e)}
              name="select"
            >
              <option>Select type of Announcement</option>
              <option>Good</option>
              <option>Neutral</option>
              <option>Bad</option>
            </select>
            <input
              type="text"
              placeholder="Date"
              className=" w-52 border-2 p-2 ml-7 focus:border-blue-400 outline-none"
              onChange={(e) => onTextFieldChange(e)}
              name="date"
              id="date_input"
            />
            <button
              onClick={(e) => onFormSubmit(e)}
              className="float-right mt-5 w-64 p-2 text-white text-lg font-medium bg-gradient-to-r from-green-500 to-green-400 rounded"
            >
              Submit
            </button>
          </form>
          <div>
            <h1 className="mt-20 text-center text-white p-2 font-medium tracking-wider bg-gradient-to-b from-yellow-500 to-yellow-400">
              Collections
            </h1>
            <div
              className="w-full mx-auto shadow-2xl p-10  h-72 overflow-y-auto"
              id="collections"
            >
              {info.map((items, i) => {
                const { announce, select, date, _id } = items;
                return (
                  <>
                    <div key={i}>
                      <div className="flex w-96 flex-col" id="top">
                        <h6 className="text-green-700 font-medium text-lg mb-2">
                          Serial no - {_id}
                        </h6>
                        <h6 className="text-green-700 font-medium text-lg mb-2">
                          Type - {select}
                        </h6>
                        <h6 className="text-green-700 font-medium text-lg mb-2">
                          Date - {date}
                        </h6>
                      </div>
                      <p className="font-medium text-lg mb-3 ">{announce}</p>
                      <buttonn
                        onClick={() => handleDelete(_id)}
                        className="float-right text-white w-12 cursor-pointer p-1 text-center border-4 bg-gray-800"
                      >
                        <DeleteIcon />
                      </buttonn>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Adminpanel;
