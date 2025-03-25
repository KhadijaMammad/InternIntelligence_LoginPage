import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleResetPassword = async (values, { setSubmitting }) => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, values.email);
      setMessage("Şifrə sıfırlama linki emailinizə göndərildi!");
    } catch (error) {
      setMessage("Xəta baş verdi: " + error.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="w-[400px] p-6 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-4">Reset your password</h2>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={handleResetPassword}
        >
          {({ isSubmitting }) => (
            <Form className="w-full">
              <div className="mb-4">
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition"
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>
            </Form>
          )}
        </Formik>

        {message && <p className="mt-4 text-center text-green-400">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
