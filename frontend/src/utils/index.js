//  Returns up to 2 uppercase initials from a full name.
//  * "Arjun Mehta" → "AM", "Priya" → "P"
  // avatar single words for name

 export  const initialWord = (name) => {
    return name
    .split(" ").map((word) => word[0]).join("").toUpperCase() ;
  };
 
//  * "2025-11-12T08:23:00Z" → "12 Nov 2025"

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
export const validateUserForm = ({ name, email, phone, company }) => {
  const errors = {};

  if (!name?.trim()) {
    errors.name = 'Name is required';
  } else if (name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = 'Must be a valid email address';
  }

  if (!phone?.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\+?[\d\s\-().]{7,20}$/.test(phone)) {
    errors.phone = 'Must be a valid phone number';
  }

  if (company && company.trim().length > 150) {
    errors.company = 'Company name must not exceed 150 characters';
  }

  return errors;
};
