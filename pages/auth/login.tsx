import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik } from "formik";
import { GetServerSidePropsContext } from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";

import { getSession } from "@helpers/auth";

import TextField from "@components/reusable/TextField";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().label("Password"),
});

interface User {
  username?: string;
  password: string;
  email: string;
}

interface ServerSideProps {
  csrfToken: string;
}

const Login = ({ csrfToken }: ServerSideProps) => {
  const router = useRouter();
  const [logMessage, setLogMessage] = useState<string>("");
  const [logError, setLogError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const callbackUrl = typeof router.query?.callbackUrl === "string" ? router.query.callbackUrl : "/events";

  const handleLogin = async (data: User) => {
    const { email, password } = data;
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const response = await signIn<"credentials">("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });
    if (!response) {
      setIsLoading(false);
      setLogError("Received empty response from next auth");
      throw new Error("Received empty response from next auth");
    }
    if (!response.error) {
      setIsLoading(false);
      setLogMessage("Logged in success");
      router.replace(callbackUrl);
      return;
    }
  };

  console.log({ csrfToken });

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen bg-secondary">
        <div className="flex flex-col justify-center items-center min-h-[50vh] w-[50vw]">
          <span className="mt-5 text-2xl font-bold text-center">Cal.com</span>
          <span className="my-5 text-2xl font-bold text-center">Sign in to your account</span>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleLogin}
            validationSchema={validationSchema}>
            {({ values, handleChange, handleSubmit, errors, handleBlur, touched, isValid }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-start px-10 pb-5 pt-10 items-start min-h-[38vh] w-[30vw]  rounded-sm border-secondary bg-white shadow-md">
                <>
                  <TextField
                    label="Email address"
                    type="text"
                    name="email"
                    inputClasses="mb-5"
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
                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    isPassword={true}
                    url="#"
                    value={values.password}
                    onBlur={handleBlur("password")}
                    onChange={handleChange("password")}
                    inputClasses="mb-5"
                  />
                  {touched.password && errors.password && (
                    <Alert severity="error" className="w-full mb-5 -mt-3">
                      {errors.password}
                    </Alert>
                  )}
                </>
                <button
                  type="submit"
                  className={`w-full px-3 py-2 rounded-sm ${
                    !isValid ? "bg-gray-100" : "bg-primary"
                  } text-white`}
                  disabled={!isValid}>
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <CircularProgress size={25} style={{ color: "white" }} />
                      <span className="ml-2">Sign in</span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>
            )}
          </Formik>

          <div className="flex flex-row mt-5">
            <span>Don&prime;t have an account &#63;</span>
            <a href="/auth/signup" className="font-bold">
              Create account
            </a>
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

export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
