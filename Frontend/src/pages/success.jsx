import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h2>🎉 Order placed successfully!</h2>
      <p>Your food is on the way 🚚</p>

      <Link to="/">Go Home</Link>
    </div>
  );
};

export default Success;