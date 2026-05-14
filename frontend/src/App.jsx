import { useState } from "react";
import UserCard from "./component/userCard";
import { FaSearch } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { Dot } from "lucide-react";
import { Plus } from 'lucide-react';
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const users = [
    {
      id: 1,
      name: "Priya",
      email: "priya@gmail.com",
    },
    {
      id: 2,
      name: "Rahul",
      email: "rahul@gmail.com",
    },
    {
      id: 3,
      name: "piddi",
      email: "rahul@gmail.com",
    },
    {
      id: 4,
      name: "vaibhav",
      email: "rahul@gmail.com",
    },
    {
      id: 5,
      name: "kriti",
      email: "rahul@gmail.com",
    },
  ];

  // filter logic here
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  //===================  SORTING ==================
  let sortedUsers = filteredUsers;

  if (sortOrder === "az") {
    sortedUsers = filteredUsers.toSorted((a, b) =>
      a.name.localeCompare(b.name),
    );
  }

  if (sortOrder === "za") {
    sortedUsers = filteredUsers.toSorted((a, b) =>
      b.name.localeCompare(a.name),
    );
  }

  return (
    <div className="main">
      {/* ============= header ================= */}
      <header className="header">
        <div className="header-left ">
          <div className="logoRow">
            <div className="logoIcon" aria-hidden="true">
              <FaUserFriends size={25} />
            </div>
            <h1 className="title">User Directory</h1>
          </div>
          <p className="subTitle">Manage your team members</p>
            <div className="syncBadge" aria-live="polite">
          <span aria-hidden="true">
            <Dot color="#04810c" className="dot" />
          </span>
          <span className="syncText"> users synced</span>
        </div>
        </div>
      
      <button className="addBtn" aria-label="Add new user" > <Plus color="#8619b8" />Add User</button>

      </header>
 {/* ============================ */}
      <div className="toolbar">
        <FaSearch />
        <input
          type="text"
          className="searchInput"
          placeholder="Search users by name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="sortBtn" onClick={() => setSortOrder("az")}>
          A-Z
        </button>
        <button className="sortBtn" onClick={() => setSortOrder("za")}>
          Z-A
        </button>
      </div>

      {filteredUsers.length === 0 && <p>No users found</p>}

      {sortedUsers.map((user) => {
        return <UserCard key={user.id} name={user.name} email={user.email} />;
      })}
    </div>
  );
}

export default App;
