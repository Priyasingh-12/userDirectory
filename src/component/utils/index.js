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

//=========== validation client side ============
export const validateUserForm = ({name, email, phone, company}) => {
  const error = {} ;

  //=============== Name validation ==============
    if (!name?.trim()) {
    error.name = 'Name is required';
  } else if (name.trim().length < 2) {
    error.name = 'Name must be at least 2 characters';
  }
  //============ email validation ========================
  if(!email.trim()){
    error.email = " Email is required" ;
  }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
// ============== phone validation ==========
if(!phone.trim()){
  error.pgone = "Phone number is required" ;
}else if (!/^\+?[\d\s\-().]{7,20}$/.test(phone)){
    error.phone = 'Must be a valid phone number';
}
//============ comapny validtion =========
  if (company && company.trim().length > 150) {
    error.company = 'Company name must not exceed 150 characters';
  }

  return error;
}
    