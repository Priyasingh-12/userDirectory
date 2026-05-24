import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

import { X, MessageCircleWarning, Plus } from "lucide-react";
import "./addUser.css";

function FormField({ label, id, error, children }) {
  return (
    <div className="group">
      <label className="label" htmlFor={id}>
        {label}
      </label>

      {children}

      {error && (
        <p className="error" role="alert">
          <MessageCircleWarning size={12} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

//  ============ validation =============

function AddUser({ closeModal }) {
  const firstInputRef = useRef(null);

  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // Focus first input on mount
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  //========================= Clear Error While Typing =============

  const setField = (key) => (e) => {
    setFields((pre) => ({ ...pre, [key]: e.target.value }));

    // Clear field error on change
    if (fieldErrors[key]) {
      setFieldErrors((pre) => ({ ...pre, [key]: "" }));
    }
     setServerError(null);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!fields.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!fields.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!fields.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    return newErrors;
  };
  // ==================  submit ===================
  const handleSubmit = () => {
    const validateError = validateForm();

    if (Object.keys(validateError).length > 0) {
      setFieldErrors(validateError);
      return;
    }
    alert("User Created Successfully");

    // ============
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("User Created");
    }, 2000);
  };

  //========================== escape key ===================
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);
  // ================== prevent background scroll =============
useEffect(() => {
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = "";
  };
}, []);
// ================== 

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget)  closeModal();
  };

  return (
    <div className="overlay" role="presentation"   onClick={handleOverlayClick}>
      <div className="modal" role="dialog"  aria-modal="true"
        aria-labelledby="modal-title">
        <div className="header">
          <h2 className="title" id="modal-title">
            Add New User
          </h2>

          <button
            className="closeBtn"
            aria-label="Close modal"
            onClick={() => {
              closeModal();
            }}
          >
            <X size={15} aria-hidden="true" />
          </button>
        </div>

{serverError && (
  <div className="serverError" role="alert">
    <MessageCircleWarning size={14} aria-hidden="true" />
    {serverError}
  </div>
)}


        <FormField label="Full Name" id="field-name" error={fieldErrors.name}>
          <input
            id="field-name"
            value={fields.name}
            ref={firstInputRef}
            type="text"
            className={`input ${fieldErrors.name ? "inputError" : ""}`}
            onChange={setField("name")}
            placeholder="enter a name"
            autoComplete="name"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            maxLength={100}
          />
        </FormField>

        <FormField
          label="Email Address"
          id="field-email"
          error={fieldErrors.email}
        >
          <input
            id="field-email"
            type="email"
            className={`input ${fieldErrors.email ? "inputError" : ""}`}
            value={fields.email}
            onChange={setField("email")}
            placeholder="enter email"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            autoComplete="email"
          />
        </FormField>

        <FormField
          label="Phone Number"
          id="field-phone"
          error={fieldErrors.phone}
        >
          <input
            id="field-phone"
            type="tel"
            value={fields.phone}
            className={`input ${fieldErrors.phone ? "inputError" : ""}`}
            onChange={setField("phone")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            placeholder="+91 98765 43210"
            autoComplete="tel"
          />
        </FormField>

        <FormField
          label="Company (optional)"
          id="field-company"
          error={fieldErrors.company}
        >
          <input
            id="field-company"
            type="text"
            value={fields.company}
            className={`input ${fieldErrors.company ? "inputError" : ""}`}
            onChange={setField("company")}
            placeholder="e.g. Epic web Techno"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            autoComplete="organization"
            maxLength={150}
          />
        </FormField>

        <div className="actions">
          <button
            type="button"
            className="cancelBtn"
            onClick={closeModal}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="button"
            className="submitBtn"
            onClick={handleSubmit}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Creating…
              </>
            ) : (
              <>
                <Plus color="#8619b8" size={15} aria-hidden="true" />
                Create User
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
