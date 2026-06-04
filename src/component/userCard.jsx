import { Building2, Clock, Phone, Mail } from "lucide-react";
import { initialWord } from "../utils";

import "./userCard.css";

const UserCard = ({ user, isNew = false, index = 0 }) => {
  return (
    <article
      className="card"
      aria-label={`User: ${user.name}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {isNew && (
        <div className="newBadge" aria-label="Newly added">
          New
        </div>
      )}

      <div className="header">
        <div className="avatar" aria-hidden="true">
          {initialWord(user.name)}
        </div>

        <div className="headerMeta">
          <h2 className="name">{user.name}</h2>

          <div className="company">
            <Building2 size={12} aria-hidden="true" />
            <span>{user.company || "—"}</span>
          </div>
        </div>
      </div>

      <div className="divider" role="separator" />

      <dl className="fields">
        <div className="field">
          <dt className="fieldIcon">
            <Mail size={14} aria-hidden="true" />
          </dt>

          <dd className="fieldValue" title={user.email}>
            {user.email}
          </dd>
        </div>

        {user.phone && (
          <div className="field">
            <dt className="fieldIcon">
              <Phone size={14} aria-hidden="true" />
            </dt>

            <dd className="fieldValue">{user.phone}</dd>
          </div>
        )}
      </dl>

      {user.createdAt && (
        <footer className="meta">
          <Clock size={14} />
          <span>
            Joined{" "}
            {new Date(user.createdAt).toLocaleDateString("en-IN")}
          </span>
        </footer>
      )}
    </article>
  );
};

export default UserCard;