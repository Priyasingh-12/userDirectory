const userCard = (props) => {

    return ( 
    <div style={{
  border: "1px solid gray",
   padding: "10px",
     margin: "10px",
     borderRadius: "5px"

    }} >
      <h2>{props.name}</h2>
      <p>{props.email}</p>
    </div>

     );
}
 
export default userCard;