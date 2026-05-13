 import { useState } from 'react';
import UserCard from './component/userCard';
import './App.css' ;


function App() {
   const [search,setSearch] = useState("")

const users = [
  {
    id: 1,
    name: "Priya",
    email: "priya@gmail.com"
  },
  {
    id: 2,
    name: "Rahul",
    email: "rahul@gmail.com"
  },
   {
    id: 3,
    name: "piddi",
    email: "rahul@gmail.com"
  },
   {
    id: 4,
    name: "vaibhav",
    email: "rahul@gmail.com"
  },
   {
    id: 5,
    name: "kriti",
    email: "rahul@gmail.com"
  }
];

// filter logic here
       const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <h1>User Directory</h1>
      <div>
        
      <input type="text"className="searchInput" placeholder="Search users by name…" 
        value={search} 
          onChange={(e) =>  setSearch(e.target.value)}
      />
          {filteredUsers.length === 0 && (
      <p>No users found</p>
    )}
      </div>
      <button>
         A-Z
      </button>
      <button>
         Z-A
      </button>

      {filteredUsers .map((user)=>{
        return(
             <UserCard   
            key={user.id} 
           name={user.name}
          email= {user.email} />

        )
      })}
      
     
    </div>
  );
}

export default App;