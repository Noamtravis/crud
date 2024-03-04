import React, { useState, useEffect } from "react";
import "./App.css";
import {
  create,
  getusers,
  finduser,
  deleteUsername,
  updateUsername,
} from "../utils/AuthServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [allusers, setAllusers] = useState([]);
  const [render, setRender] = useState(false);
  const [specificUser, setSpecificUser] = useState("");
  const [delUsername, setDelUsername] = useState("");
  const [upUsername, setUpUsername] = useState("");
  const [showContacts, setShowContacts] = useState(false);

  useEffect(() => {
    async function get() {
      try {
        const users = await getusers();
        setAllusers(users.data);
        console.log(users.data);
      } catch (e) {
        console.error(e);
      }
    }
    get();
  }, [render]);

  const toggleContacts = () => {
    setShowContacts(!showContacts);
  };
  const handleClick = async () => {
    if (username && phoneNumber && email) {
      const user = await create({
        username: username,
        phoneNumber: phoneNumber,
        email: email,
      });
      setUsername("");
      setPhoneNumber("");
      setEmail("");
      setRender(!render);
      console.log(user);
      toast.success("Contact created");
    } else {
      console.log("Please fill in all the required fields");
    }
  };

  const handleSearch = async () => {
    const oneUser = await finduser({
      username: searchUsername,
    });
    setUsername("");
    setPhoneNumber("");
    setEmail("");
    setSpecificUser(oneUser.data);
  };

  const handleDelete = async () => {
    const deleteUser = await deleteUsername(delUsername);
    setDelUsername(deleteUser);
    toast.success("Contact deleted");
    setRender(!render);
  };

  const handleUpdate = async () => {
    try {
      const updateUser = await updateUsername({
        username: upUsername,
        phoneNumber: phoneNumber,
        email: email,
      });
      console.log(updateUser.data);
      setUpUsername("");
      setPhoneNumber("");
      setEmail("");
      setRender(!render);
      toast.success("Contact updated");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="header">
        Welcome to your <span className="headercolor">contactlist</span>, <br />
        fill your contact's info to create a new contact:
      </h1>
      <br />
      <label className="label">Username:</label>
      <input
        className="input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
      />
      <br />
      <label className="label">Phone number:</label>
      <input
        className="input"
        value={phoneNumber}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "");
          setPhoneNumber(value.slice(0, 10));
        }}
        type="text"
      />

      <br />
      <label className="label">Email:</label>
      <input
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
      />
      <button className="button" onClick={() => handleClick()}>
        Submit
      </button>
      <br />
      <br />
      <h3 className="label">Search contact by username:</h3>
      <input
        className="input"
        onChange={(e) => setSearchUsername(e.target.value)}
        type="text"
      />
      <button className="button" onClick={() => handleSearch()}>
        Search
      </button>
      <br />
      <h1 className="result">
        <p>{specificUser.username}</p>
        <p>{specificUser.phoneNumber}</p>
        <p> {specificUser.email}</p>
      </h1>
      <h3 className="label">Display all your contacts:</h3>
      <button className="button" onClick={toggleContacts}>
        {showContacts ? "Hide Contacts" : "Show Contacts"}
      </button>
      {showContacts && (
        <div>
          {allusers.map((user, index) => (
            <h1 className="contact" key={index}>
              Name: {user.username}
              <br />
              Phone number: {user.phoneNumber}
              <br />
              Email: {user.email}
            </h1>
          ))}
        </div>
      )}
      <h3 className="label">Update contact info by username:</h3>
      <input
        className="input"
        value={upUsername}
        onChange={(e) => setUpUsername(e.target.value)}
        type="text"
      />
      <br />
      <label className="label">New Phone number:</label>
      <input
        className="input"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        type="text"
      />
      <br />
      <label className="label">New Email:</label>
      <input
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
      />
      <button className="button" onClick={() => handleUpdate()}>
        Update user info
      </button>
      <br />
      <h3 className="label">Delete contact by username:</h3>
      <input
        className="input"
        onChange={(e) => setDelUsername(e.target.value)}
        type="text"
      />
      <button className="button" onClick={() => handleDelete()}>
        Delete user
      </button>
      <ToastContainer />
    </div>
  );
}

export default App;
