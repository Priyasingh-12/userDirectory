//  Returns up to 2 uppercase initials from a full name.
//  * "Arjun Mehta" → "AM", "Priya" → "P"
  // avatar single words for name

 export  const initialWord = (name) => {
    return name
    .split(" ").map((word) => word[0]).join("").toUpperCase() ;
  };
 
//  * "2025-11-12T08:23:00Z" → "12 Nov 2025"

export const formDate = (Date) => {
    return new Date(Date).toLocaleDateString('en-IN',{
       day: 'numeric',
       month:'short'  ,
       year:'numeric' ,
    })
}

