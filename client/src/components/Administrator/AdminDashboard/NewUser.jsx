import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import dayjs from "dayjs";
function NewUser() {
  const { users } = useOutletContext();
  return (
    <div className="table-container">
      {/* <div>
          <h1>New Users</h1>
          <div className="input-group">
            <input type="search" placeholder=" " required />
            <span className="floating-label search">Search</span>
            <span className="floating-icon search">
              <SearchSharpIcon />
            </span>
          </div>
        </div> */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter(
              (user) => user.role !== "Admin" && user.status === "Activated"
            )
            .filter((user) => {
              return dayjs().diff(user.datecreated, "days") <= 10;
            }).sort((a, b) => dayjs(b.datecreated).diff(a.datecreated))
            .slice(0, 10) // Select only the first 10 users after filtering
            .map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{dayjs(user.datecreated).format("MMMM DD, YYYY hh:mm A")}</td>
                  <td>
                    <div>
                      <Link to={`/Admin/Accounts/${user.id}`}>
                        <button className="tertiary solid">View</button>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="see-more">
        <Link to="/Admin/Accounts">
          <p>See more...</p>
        </Link>
      </div>
    </div>
  );
}

export default NewUser;

const newUser = [
  {
    id: 1,
    username: "user1",
    role: "Customer",
    dateCreated: "2024-04-08",
  },
  {
    id: 2,
    username: "user2",
    role: "Vendor",
    dateCreated: "2024-04-08",
  },
  {
    id: 3,
    username: "user3",
    role: "Customer",
    dateCreated: "2024-04-08",
  },
  {
    id: 4,
    username: "user4",
    role: "Vendor",
    dateCreated: "2024-04-08",
  },
  {
    id: 5,
    username: "user5",
    role: "Customer",
    dateCreated: "2024-04-08",
  },
  {
    id: 6,
    username: "user6",
    role: "Vendor",
    dateCreated: "2024-04-08",
  },
  {
    id: 7,
    username: "user7",
    role: "Customer",
    dateCreated: "2024-04-08",
  },
  {
    id: 8,
    username: "user8",
    role: "Vendor",
    dateCreated: "2024-04-08",
  },
  {
    id: 9,
    username: "user9",
    role: "Customer",
    dateCreated: "2024-04-08",
  },
  {
    id: 10,
    username: "user10",
    role: "Vendor",
    dateCreated: "2024-04-08",
  },
];
