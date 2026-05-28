import { useState } from "react";
import { useMemo } from "react";
import UserCard from "./component/userCard";
import AddUser from "./component/AddUser";
import useDebounce from "./hooks/useDebounce";

import { FaSearch, FaUserFriends } from "react-icons/fa";
import { Dot, Plus } from "lucide-react";
import { RiResetRightFill } from "react-icons/ri";

import "./App.css";

const SORT = { AZ: "az", ZA: "za" };

function App() {
  const [searchRaw, setSearchRaw] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [showModal, setShowModal] = useState(false);
  const search = useDebounce(searchRaw, 500);

  const [users] = useState([
    {
      id: 1,
      name: "Priya",
      email: "priya@gmail.com",
      company: "Edovu vewnture's pvt ltd",
    },
    {
      id: 2,
      name: "Rahul",
      email: "rahul@gmail.com",
      company: "cognizant",
    },
    {
      id: 3,
      name: "piddi",
      email: "rahul@gmail.com",
      company: "volt",
    },
    {
      id: 4,
      name: "vaibhav",
      email: "rahul@gmail.com",
      company: "seimen",
    },
    {
      id: 5,
      name: "kriti",
      email: "rahul@gmail.com",
      company: "samsung",
    },
  ]);

  // ====================== company count

  const uniqueCompanies = new Set(users.map((u) => u.company.toLowerCase()))
    .size;
  //  ========== add usememo optimization===========

  const sortedUsers = useMemo(() => {
    // filter logic here  filter users
    let filtered = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    );
    //===================  SORTING ==================
    if (sortOrder === SORT.AZ) {
      filtered = filtered.toSorted((a, b) => a.name.localeCompare(b.name));
    }

    if (sortOrder === SORT.ZA) {
      filtered = filtered.toSorted((a, b) => b.name.localeCompare(a.name));
    }
    return filtered;
  }, [users, search, sortOrder]);

  // ===================
  const toggleSort = (direction) => {
    setSortOrder((pre) => (pre === direction ? "" : direction));
  };
  // -------------------- reset logic filter ----------------------------
  const resetFilters = () => {
    setSearchRaw("");
    setSortOrder("");
  };
  // =============== hide reset when no filter
  const filteredIf = Boolean(search.trim() || sortOrder);

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

        <button
          className="addBtn"
          aria-label="Add new user"
          onClick={() => setShowModal(!showModal)}
        >
          {" "}
          <Plus color="#8619b8" />
          Add User
        </button>
      </header>
      {/* ==============status ======== */}
      <div className="stats">
        <div className="statPill">
          <span className="statNum">{users.length}</span>
          <span className="statLabel">Total</span>
        </div>

        <div className="statPill">
          <span className="statNum">{uniqueCompanies}</span>
          <span className="statLabel">Companies</span>
        </div>

        <div className="statPill">
          <span className="statNum" style={{ color: "var(--accent)" }}>
            {sortedUsers.length}
          </span>
          <span className="statLabel">Shows</span>
        </div>
        <div className="sortTag">active</div>
      </div>

      {/* ============================================== */}
      <div className="toolbar" role="search">
        <div className="searchWrap">
          <FaSearch size={16} className="searchIcon" aria-hidden="true" />
          <input
            type="text"
            className="searchInput"
            placeholder="Search users by name…"
            value={searchRaw}
            onChange={(e) => setSearchRaw(e.target.value)}
            aria-label="Search users by name"
          />
        </div>

        <button
          className={`sortBtn ${sortOrder === SORT.AZ ? "activeSort" : ""}`}
          onClick={() => toggleSort(SORT.AZ)}
          title="Sort A to Z"
        >
          A-Z
        </button>
        <button
          className={`sortBtn ${sortOrder === SORT.ZA ? "activeSort" : ""}`}
          onClick={() => toggleSort(SORT.ZA)}
          title="Sort Z to A"
        >
          Z-A
        </button>
        {/* ============================ reset button=============== */}
        {filteredIf && (
          <button className="resetBtn" onClick={resetFilters}>
            <RiResetRightFill size={14} aria-hidden="true" />
            Reset
          </button>
        )}
      </div>
      {/* ================ FILTER */}
      {sortedUsers.length === 0 && <p>No users found</p>}

      <div className="userGrid">
        {sortedUsers.map((user, index) => (
          <UserCard
            key={user.id}
            user={user}
            isNew={user.isNew}
            index={index}
          />
        ))}
      </div>

      {showModal && <AddUser closeModal={() => setShowModal(false)} />}
    </div>
  );
}

export default App;
