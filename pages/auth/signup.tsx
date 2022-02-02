import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Avatar } from "@mui/material";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { Formik } from "formik";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as Yup from "yup";

import SignupTextField from "../../components/reusable/SignupTextField";

interface User {
  username?: string;
  password: string;
  email: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Username"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().label("Password"),
});

const Signup = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [logMessage, setLogMessage] = useState<string>("");
  const [logError, setLogError] = useState<string>("");

  const handleSignup = async (data: User) => {
    const { data: response } = await axios.post("/api/auth/signup", data);
    return response.data;
  };

  const { mutate, isLoading, error } = useMutation(handleSignup, {
    onSuccess: () => {
      setLogMessage("Register success");
      router.replace("/");
    },
    onError: () => {
      let errorMessage = "Something went wrong";
      if (error instanceof Error) {
        errorMessage = `${error.message}`;
      }
      setLogError(errorMessage);
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  const handleSubmitData = (data: User) => {
    mutate(data);
  };

  useEffect(() => {
    const redirectOnLogin = async () => {
      const session = await getSession();
      if (session) router.replace("/");
    };
    redirectOnLogin();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen bg-secondary">
        <div className="w-[80%] min-h-[60%] flex justify-between items-start flex-row">
          <div className="flex flex-col justify-start items-start min-h-full w-[50%]">
            <span className="text-lg font-medium">Cal.com</span>
            <p className="text-xl font-bold">You&apos;re one step away from simpler scheduling.</p>
            <p className="my-2 text-xs font-light text-gray-400">
              &quot;I love being able to use a tool that just works, and that is open source. As a developer,
              I love being empowered to contribute to a tool that I use reguraly&quot;
            </p>
            <div className="flex flex-row items-center justify-around">
              <div className="flex items-center justify-center p-1 border-2 border-black rounded-full h-25 w-25">
                <Avatar alt="Cassidy Williams" className="rounded-full w-25 h-25" />
              </div>

              <div className="flex flex-col items-start justify-center mx-3 mt-2">
                <p className="font-medium">
                  Cassidy Williams
                  <span className="text-blue-500">@cassidoo</span>
                </p>
                <span className="my-2 text-xs font-light text-gray-400">
                  Director of Developer Experience at Netilify
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between items-start h-full w-[50%] border-2 border-secondary shadow-xl bg-white">
            <div className="w-full h-[80%] p-5 flex flex-col justify-start items-start">
              <span className="text-sm font-bold">Start your 14-day free trial</span>
              <span className="text-xs font-light text-gray-400">
                No credit card required. Try all pro features for 14 days.
              </span>
              <span className="mb-2 text-xs font-light text-gray-400">
                Upgrade at any time to Pro for $12/month.
              </span>
              <div className="flex items-center justify-around w-full">
                <div className="border-[0.025rem] border-primary w-[48%]  h-[0.025rem]" />
                <KeyboardArrowDownIcon width={10} height={10} />
                <div className="border-[0.025rem] border-primary w-[48%]  h-[0.025rem]" />
              </div>
              <Formik
                initialValues={{ name: "", email: "", password: "" }}
                onSubmit={handleSubmitData}
                validationSchema={validationSchema}>
                {({ values, handleChange, handleSubmit, errors, handleBlur, touched, isValid }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-start pb-5 pt-10 items-start min-h-[38vh] w-full">
                    <>
                      <div className="flex flex-row w-full">
                        <div className="font-bold text-xs text-gray-400 w-[20%] border-secondary my-3 border-2 px-3 py-2 shadow appearance-none leading-tight focus:outline-none focus:shadow-outline space-x-2 rounded-sm flex justify-center items-center">
                          cal.com/
                        </div>
                        <SignupTextField
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          classes="w-[80%]"
                          value={values.username}
                          onBlur={handleBlur("name")}
                          onChange={handleChange("name")}
                        />
                      </div>
                      {touched.username && errors.username && (
                        <Alert severity="error" className="w-full mb-5 -mt-3">
                          {errors.username}
                        </Alert>
                      )}
                    </>
                    <>
                      <SignupTextField
                        type="email"
                        name="email"
                        placeholder="Email address"
                        classes="w-full"
                        value={values.email}
                        onBlur={handleBlur("email")}
                        onChange={handleChange("email")}
                      />
                      {touched.email && errors.email && (
                        <Alert severity="error" className="w-full mb-5 -mt-3">
                          {errors.email}
                        </Alert>
                      )}
                    </>

                    <>
                      <SignupTextField
                        type="password"
                        name="password"
                        placeholder="Password"
                        classes="w-full"
                        value={values.password}
                        onBlur={handleBlur("password")}
                        onChange={handleChange("password")}
                      />
                      {touched.password && errors.password && (
                        <Alert severity="error" className="w-full mb-5 -mt-3">
                          {errors.password}
                        </Alert>
                      )}
                    </>

                    <button
                      type="submit"
                      className={`w-full my-2 px-3 py-2 rounded-sm  ${
                        !isValid ? "bg-gray-100" : "bg-primary"
                      } text-white`}
                      disabled={!isValid}>
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <CircularProgress size={25} style={{ color: "white" }} />
                          <span className="ml-2">Sign up for free</span>
                        </div>
                      ) : (
                        "Sign up for free"
                      )}
                    </button>
                  </form>
                )}
              </Formik>
            </div>
            <div className="w-full h-[20%] bg-secondary border-2 border-secondary px-5 py-3">
              <p className="font-light">
                By sigining up&sbquo; you agree to our
                <span className="mx-1 font-semibold text-black">Terms of services</span>
                and
                <span className="mx-1 font-semibold text-black">Privacy Policy</span>
              </p>
              <p>
                Need help?
                <a href="#" className="mx-1 font-semibold text-black">
                  Get in touch
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed left-[40%] bottom-10 shadow-2xl">
        {logError && (
          <button
            type="button"
            onClick={() => setLogError("")}
            className="flex items-center justify-center w-full h-full">
            <Alert severity="error">{logError}</Alert>
          </button>
        )}
        {logMessage && (
          <button
            type="button"
            onClick={() => setLogMessage("")}
            className="flex items-center justify-center w-full h-full">
            <Alert severity="success">{logMessage}</Alert>
          </button>
        )}
      </div>
    </>
  );
};

export default Signup;
