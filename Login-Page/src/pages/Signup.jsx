import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const navigate = useNavigate();

  const SignUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);

      toast.success("✅ Registration successful!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTimeout(() => navigate("/"), 2000); // 2 saniyə sonra yönləndir
    } catch (error) {
      toast.error(`❌ ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setSubmitting(false);
  };

  return (
    <div className="container bg-black h-screen text-white flex justify-center items-center">
      <div className="signup-page w-[450px] rounded-xl p-6 border border-gray-100 flex flex-col items-center">
        <h2 className="text-4xl text-white mb-6 font-medium">Sign Up</h2>
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full">
              <div className="w-full mb-4">
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="w-full mb-4">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="w-full mb-4">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium hover:opacity-90 transition"
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-4 text-sm">
          <span>Already have an account? </span>
          <Link to="/" className="text-blue-400">Login</Link>
        </div>
      </div>

      {/* ToastContainer əlavə edildi */}
      <ToastContainer />
    </div>
  );
}
