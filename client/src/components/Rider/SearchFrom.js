import React, { useState } from "react";
import axios from "axios";
const SearchFrom = (props) => {
  const { close, user } = props;
  const [msg, setmsg] = useState("");
  const [input, setinput] = useState({
    name: "",
    email: "",
    date: "",
  });

  const onChange = (e) => {
    setinput({ ...input, [e.target.id]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, fromdate, todate } = input;
    const id = user._id;
    const search = { id, name, email, fromdate, todate };
    if (!id || !name || !email || !fromdate || !todate) {
      setmsg("Please Enter All The Fields");
      return null;
    }
    close();
    await axios
      .post(
        `http://localhost:1337/cabshare/api/rider/querySearch/${id}`,
        search
      )
      .then((res) =>
        res.data.msg === "success"
          ? alert(
              `A response mail containing Search Result has been sent to Your ${email}`
            )
          : alert("No Journey Detail found between Specified Dates")
      )
      .catch((err) => alert(err));
  };
  return (
    <div>
      <div className="request-box">
        <div className="modal-box">
          <div className="modal-container">
            <form>
              <div className="modal-header">
                <h1>Search</h1>
                <span
                  onClick={() => {
                    close();
                  }}
                >
                  &times;
                </span>
              </div>

              {msg ? (
                <div>
                  <div className="">{msg}</div>
                  <br />
                </div>
              ) : null}
              <div className="form-group modal-span">
                <label htmlFor="name" className="form-label">
                  Your Name :
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  onChange={onChange}
                  onClick={() => setmsg("")}
                />
              </div>
              <div className="form-group modal-span">
                <label htmlFor="email" className="form-label">
                  Email-Id :
                </label>

                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  onChange={onChange}
                  onClick={() => setmsg("")}
                />
              </div>
              <div className="form-group modal-span ">
                <label htmlFor="fromdate" className="form-label">
                  From Date
                </label>

                <input
                  type="date"
                  className="form-control "
                  id="fromdate"
                  placeholder="Date"
                  onChange={onChange}
                  onClick={() => setmsg("")}
                />
              </div>
              <div className="form-group modal-span">
                <label htmlFor="todate" className="form-label">
                  To Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  id="todate"
                  placeholder="Date"
                  onChange={onChange}
                  onClick={() => setmsg("")}
                />
              </div>

              <button
                type="submit"
                className="request-form-btn"
                onClick={onSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchFrom;
