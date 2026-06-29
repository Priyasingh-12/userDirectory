
const validateUser = (req,res,next) => {
  const { name, email, phone, company } = req.body;

  if(!name || !email || !phone) {
 return  res.status(400).json({
      success: false,
      message: "Name, Email and Phone are required",
 })
}

  if (name.trim().length < 2) {
    return res.status(400).json({
       success: false,
      message: "Name must be at least 2 characters",
    })
  }
 // Email validation
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  // Phone validation
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Phone must be 10 digits",
    });
  }
 if (company.trim().length > 150) {
      return res.status(400).json({
        success: false,
        message: "Company name cannot exceed 150 characters",
      });
    }

     next();

}

module.exports = validateUser;