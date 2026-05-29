const SkeletonCard = () => {
  return (
    <article className="card" aria-hidden="true">
      <div className="header">
        <div className="avatar skel" />
        <div className="headerText">
          <div className="skel line" style={{ width: "60%" }} />
          <div
            className="skel line"
            style={{ width: "40%", height: "10px", marginTop: "8px" }}
          />
        </div>
      </div>
      <div className="skel divider" />
      <div className="skel field" style={{ width: "100%" }} />
      <div className="skel field" style={{ width: "85%" }} />
      <div className="skel field" style={{ width: "50%", marginTop: "14px" }} />
    </article>
  );
};

export default SkeletonCard;
