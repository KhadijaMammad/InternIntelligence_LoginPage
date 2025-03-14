import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Şifrə sıfırlama linki emailinizə göndərildi!");
    } catch (error) {
      setMessage("Xəta baş verdi: " + error.message);
    }
  };

  return (
    <div>
      <h2>Reset your password</h2>
      <input
        type="email"
        placeholder="Emailinizi daxil edin"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleResetPassword}>Send</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
