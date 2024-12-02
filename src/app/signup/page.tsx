"use client";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import style from "./signup.module.css";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FormValue {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

const initialValues: FormValue = {
  email: "",
  password: "",
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [messages, setMessages] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const router = useRouter();
  const handleSubmit = async (value: FormValue) => {
    // console.log(value)

    try {
      const data = await fetch(`http://localhost:4000/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      if (data.ok) {
        value;
        router.push("/admin");
      } else {
        setMessages("Invalid email and password");
      }

      // console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className={style.page}>
      <Box>
        <Image
          src="https://img.freepik.com/premium-vector/three-people-working-laptops-company-employees-talking-about-boss-tasks-sitting-with-laptop-simple-minimalist-flat-vector-illustration_538213-119540.jpg?ga=GA1.1.2107727690.1726806487"
          alt="hello"
          height={660}
          width={600}
        />
      </Box>
      <Box sx={{ margin: "auto", width: "430px" }}>
        <Typography variant="h4">Sign in to your account</Typography>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ handleBlur, handleChange, touched, errors }) => (
            <Form className={style.form}>
              <Field
                as={TextField}
                name="email"
                label="Email or Phone"
                type="email"
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched.email && errors.email}
                helperText={<ErrorMessage name="email" />}
              />

              <Field
                as={TextField}
                variant="outlined"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                label="password"
                type={showPassword ? "text" : "password"}
                error={touched.password && errors.password}
                helperText={<ErrorMessage name="password" />}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{ fontSize: "small", color: "blue" }}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? "hide" : "show"}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
             <Typography color="error" variant="body2">{messages}</Typography>
              <Button
                type="submit"
                variant="contained"
                // disableRipple
                sx={{
                  "&.MuiButton-root": {
                    textTransform: "none",
                    background: "cadetblue",
                    fontSize: "large",
                    color: "black",
                    padding: "8px 16px",
                  },
                }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default SignUp;
