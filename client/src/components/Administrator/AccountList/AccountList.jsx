import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import dayjs from "dayjs";
function AccountList() {
  const { users } = useOutletContext();
  return (
    <div>
      <h1>Accounts</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter(
                (user) => user.role !== "Admin" && user.status === "Activated"
              ).sort((a, b) => dayjs(b.datecreated).diff(a.datecreated))
              .map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <div>
                        <Link to={`/Admin/Accounts/${user.id}`}>
                          <button className="tertiary solid fade">View</button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccountList;
