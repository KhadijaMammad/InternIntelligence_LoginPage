import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(
    JSON.parse(localStorage.getItem("rememberMe")) || false
  );

  useEffect(() => {
    localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
  }, [rememberMe]);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);

      // Qeydiyyatdan keçmiş email-ləri yadda saxla
      let savedEmails = JSON.parse(localStorage.getItem("savedEmails")) || [];
      if (!savedEmails.includes(values.email)) {
        savedEmails.push(values.email);
        localStorage.setItem("savedEmails", JSON.stringify(savedEmails));
      }

      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="container bg-black h-screen text-white flex justify-center items-center">
      <div className="login-page border w-[450px] rounded-xl p-6 border-solid border-gray-100 flex flex-col items-center">
        <h2 className="text-4xl text-white p-6 text-center font-medium">Login</h2>
        <Formik
          initialValues={{ email: "", password: "" }} 
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full">
              <div className="mb-3">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-2xl border-solid"
                />
                <ErrorMessage name="email" component="span" className="text-red-500 text-sm" />
              </div>

              <div className="mb-3">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-2xl border-solid"
                />
                <ErrorMessage name="password" component="span" className="text-red-500 text-sm" />
              </div>

              <div className="flex justify-between items-center mb-4">
                {/* Remember Me */}
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2"
                  />
                  Remember me
                </label>

                {/* Forget Password */}
                <div className="forget-pass">
                  <Link to="forgotpassword" className="text-blue-400">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 px-12 py-2 w-full text-center border-solid rounded-4xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              >
                {isSubmitting ? "Logging in..." : "Sign in"}
              </button>

              <div className="signup-link mt-4 text-center">
                <span>Don't have an account? </span>
                <Link to="/signup" className="text-blue-400">
                  Sign up
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
