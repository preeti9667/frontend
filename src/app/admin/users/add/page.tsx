"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ADD_USERS_API, ADMIN_USER_ROUTE } from "@/constant";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AdminLayout from "@/app/admin/AdminLayout";
import { useRouter } from "next/navigation";
import useRequestPost from "@/util/useRequestPost";

interface FormValue {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
}
const validationSchema = Yup.object({
  firstName: Yup.string().required("First-Name is required"),
  lastName: Yup.string().required("Last-Name is required"),
  fullName: Yup.string().required("Full-Name is required"),
  email: Yup.string().required("Email is required"),
});

const MeetingForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: FormValue = {
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
  };

  const handleSubmit = async (values: FormValue) => {
    // console.log(values);
    setIsLoading(true);
    const response = await useRequestPost({
      url: `${ADD_USERS_API}`,
      data: values,
    });
    setIsLoading(false);
    if (response.status === 200) {
      // const { token } = await response.data.result;
      // setCookie("userToken", token, {
      //   maxAge: 60 * 60 * 24 * 7,
      // });
      router.push(`${ADMIN_USER_ROUTE.url}`);
    }
  };

  return (
    <AdminLayout>
      <Box
        sx={{
          background: { xs: "none", md: "white", lg: "white", xl: "white" },
          height: "87vh",
        }}
      >
        <Box
          sx={{
            background: "var(--text-color)",
            padding: "15px",
            display: "flex",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <ArrowBackIcon
            fontSize="small"
            onClick={() => router.back()}
            sx={{
              width: "30px",
              height: "30px",
              cursor: "pointer",
              color: "white",
            }}
          />

          <Typography variant="h5" color="white">
            Add User
          </Typography>
        </Box>

        <Box
          sx={{
            width: {
              xl: "450px",
              lg: "450px",
              sm: "300px",
              ms: "300px",
              md: "350px",
            },
            padding: { xs: "0", md: "20px", lg: "20px", xl: "20px" },
          }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({
              values,
              handleBlur,
              handleChange,
              errors,
              touched,
              handleReset,
            }) => (
              <Form>
                <Box mt={1}>
                  <label htmlFor="firstName">FirstName:</label>
                  <Field
                    as={TextField}
                    name="firstName"
                    value={values.firstName}
                    type="firstName"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={<ErrorMessage name="firstName" />}
                    margin="auto"
                  />
                </Box>

                <Box mt={1}>
                  <label htmlFor="lastName">LastName:</label>
                  <Field
                    as={TextField}
                    name="lastName"
                    value={values.lastName}
                    type="lastName"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={<ErrorMessage name="lastName" />}
                    margin="auto"
                  />
                </Box>

                <Box mt={1}>
                  <label htmlFor="fullName">FullName:</label>
                  <Field
                    as={TextField}
                    name="fullName"
                    value={values.fullName}
                    type="fullName"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.fullName && Boolean(errors.fullName)}
                    helperText={<ErrorMessage name="fullName" />}
                    margin="auto"
                  />
                </Box>
                <Box mt={1}>
                  <label htmlFor="email">Email:</label>
                  <Field
                    as={TextField}
                    name="email"
                    value={values.email}
                    type="email"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={<ErrorMessage name="email" />}
                    margin="auto"
                  />
                </Box>

                <Box sx={{ display: "flex", margin: "10px 0", gap: "10px" }}>
                  <Button
                    onClick={handleReset}
                    variant="contained"
                    color="error"
                  >
                    Clear
                  </Button>

                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                    disabled={isLoading}
                  >
                    Submit
                    {isLoading && <CircularProgress size={20} />}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
      {/* </Box> */}
    </AdminLayout>
  );
};

export default MeetingForm;
