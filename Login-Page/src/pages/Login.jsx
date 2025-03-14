import React from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {auth} from "../firebase/firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, {setSubmitting}) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      alert("Success");
      navigate("/home");
    } catch (error) {
      alert(error.message);
      //   console.error(error);
    }
    setSubmitting(false);
  };
  return (
    <>
      <div className="container bg-black h-screen text-white text-center flex justify-center items-center">
        <div className="login-page border-1 w-[450px] rounded-xl p-[15px] border-solid border-gray-100 flex flex-col items-center justify-center">
          <h2 className="text-4xl text-white mb-px p-8 text-center font-medium">
            Login
          </h2>
          <div className="login-form m-3 ">
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({isSubmitting}) => (
                <Form>
                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className=" w-full px-8 py-2 rounded-2xl border-solid"
                    />
                    <br />
                    <ErrorMessage
                      name="email"
                      component="span"
                      style={{color: "red", fontSize: "12px"}}
                    />
                  </div>
                  <br />
                  <div>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full px-8 py-2 mb-4 rounded-2xl border-white"
                    />
                    <br />
                    <ErrorMessage
                      name="password"
                      component="span"
                      style={{color: "red", fontSize: "12px"}}
                    />
                  </div>
                  <div className="suggest flex items-center place-content-between gap-3  mb-3">
                    <div className="input flex items-center">
                      <input type="checkbox" />
                      <label>Remember me</label>
                    </div>
                    <div className="forget-pass">
                        <Link to="forgotpassword" className="text-blue-400">Forget Password?</Link>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-5 px-12 py-2 w-full mt-4 text-center border-solid rounded-4xl bg-rose-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  >
                    {isSubmitting ? "Logging in..." : "Sign in"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
