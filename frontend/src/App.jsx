import { useEffect, useMemo, useCallback, useState } from "react";

import UserCard from "./component/userCard";
import AddUser from "./component/AddUser";
import SkeletonCard from "./component/SkeletonCard";
import useDebounce from "./hooks/useDebounce";

import { FaSearch, FaUserFriends } from "react-icons/fa";
import { Dot, Plus } from "lucide-react";
import { RiResetRightFill } from "react-icons/ri";
import { getUsers } from "./api/userApi";

import "./App.css";

const SORT = {
  AZ: "az",
  ZA: "za",
};

function App() {
  const [searchRaw, setSearchRaw] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  
  // debounce search
  const search = useDebounce(searchRaw, 400);

  // company count
const uniqueCompanies = useMemo(() => {
  return new Set(
    users.map((u) => u.company?.toLowerCase() || "unknown")
  ).size;
}, [users]);

  // filtered + sorted users

  const sortedUsers = useMemo(() => {
  let filtered = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (sortOrder === SORT.AZ) {
      filtered = [...filtered].sort((a, b) =>
      (a.name || "").localeCompare(b.name || "")
    );
  }

  if (sortOrder === SORT.ZA) {
    filtered = [...filtered].sort((a, b) =>
      (b.name || "").localeCompare(a.name || "")
    );
  }

  return filtered;
}, [users, search, sortOrder]);

 // sorting
  const toggleSort = useCallback((direction) => {
    setSortOrder((prev) => (prev === direction ? "" : direction));
  }, []);

  // reset filters
  const resetFilters = useCallback(() => {
    setSearchRaw("");
    setSortOrder("");
  }, []);


  //=====================  get data api =====
useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getUsers();

      console.log(response.data); // Check the API response

      setUsers(response.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);
  // add user
        // add user
const addUser = (newUser) => {
  setUsers((prev) => [
    {
      ...newUser,
      // id: Date.now(),
      // createdAt: Date.now(),
      isNew: true,
    },
    ...prev,
  ]);
};

  // show reset button only if filters applied
  const filteredIf = Boolean(searchRaw.trim() || sortOrder);

  return (
    <div className="main">
      {/* Header */}
      <header className="header">
        <div className="header-left">
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

            <span className="syncText">Users synced</span>
          </div>
        </div>

        <button
          className="addBtn"
          aria-label="Add new user"
          onClick={() => setShowModal(true)}
        >
          <Plus color="#8619b8" />
          Add User
        </button>
      </header>

      {/* Stats */}
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
          <span
            className="statNum"
            style={{ color: "var(--accent)" }}
          >
            {sortedUsers.length}
          </span>

          <span className="statLabel">Shown</span>
        </div>

        <div className="sortTag">active</div>
      </div>

      {/* Toolbar */}
      <div className="toolbar" role="search">
        <div className="searchWrap">
          <FaSearch
            size={16}
            className="searchIcon"
            aria-hidden="true"
          />

          <input
            type="text"
            className="searchInput"
            placeholder="Search users by name..."
            value={searchRaw}
            onChange={(e) => setSearchRaw(e.target.value)}
            aria-label="Search users by name"
          />
        </div>

        <button
          className="sortBtn"
          onClick={() => toggleSort(SORT.AZ)}
        >
          A-Z
        </button>

        <button
          className="sortBtn"
          onClick={() => toggleSort(SORT.ZA)}
        >
          Z-A
        </button>

        {filteredIf && (
          <button className="resetBtn" onClick={resetFilters}>
            <RiResetRightFill size={14} aria-hidden="true" />
            Reset
          </button>
        )}
      </div>

      {/* Users */}
      <div className="grid">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : sortedUsers.map((user, index) => (
              <UserCard
                key={user.id}
                user={user}
                isNew={user.isNew}
                index={index}
              />
            ))}
      </div>

      {!loading && sortedUsers.length === 0 && (
        <p>No users found</p>
      )}

      {/* Modal */}
      {showModal && (
        <AddUser
          closeModal={() => setShowModal(false)}
          addUser={addUser}
        />
      )}
    </div>
  );
}

export default App;