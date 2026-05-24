import { Building2, Clock, Phone, Mail } from "lucide-react";
import { initialWord, formatDate } from "@/utils";

import "./userCard.css";

const UserCard = ({ user, isNew = false, index = 0 }) => {
  return (
    <article
      className="card"
      aria-label={`User: ${user.name}`}
      style={{ animationDelay: `${index * 40}ms` }} //delay animation for different cards
    >
      {/* to show new badge notifi */}
      {isNew && (
        <div className="newBadge" aria-label="Newly added">
          New
        </div>
      )}

      <div className="header">
        <div className="avatar" aria-hidden="true">{initialWord(user.name)}</div>
        <div className="headerMeta">
          <h2 className="name">{user.name}</h2>
          <div className="company">
            <Building2 size={12} aria-hidden="true" />
            {/*  fallback company value If company exists → show it Else → show — */}
            <span>{user.company || "—"}</span>
          </div>
        </div>
      </div>
      {/* ================= separator ==================== */}

    <div className="divider" role="separator"></div>  
        <dl className="fields">
          <div className="field">
            <dt className="fieldIcon">
              <Mail size={14} aria-label="Email" />
            </dt>
            <dd className="fieldValue" title={user.email}>{user.email}</dd>
          </div>

          <div className="field">
            <dt className="fieldIcon">
              {" "}
             <Phone size={14} aria-label="Phone" />
            </dt>
            <dd className="fieldValue">{user.phone}</dd>
          </div>
        </dl>

        <footer className="meta">
          <Clock size={10} aria-hidden="true" />
          <time dateTime={user.createdAt}> Joined {formatDate(user.createdAt)}</time>
        </footer>
    
    </article>
  );
};

export default UserCard;
