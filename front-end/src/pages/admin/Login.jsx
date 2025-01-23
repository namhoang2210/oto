import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputField from "../../components/shared/InputField";
import { withNavigate } from "../../hoc/withNavigate";
import Logo from "../../components/shared/Logo";
import axios from "axios";  // Thêm axios để gọi API

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initFormValue: {
        username: "",
        password: "",
      },
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (token && isAuthenticated === 'admin') {
      this.props.navigate("/admin");
    }
  }

  handleSubmit = async (values, { setFieldError }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        username: values.username,
        password: values.password,
      });

      const { token, user } = response.data;

      // Lưu token và thông tin user vào localStorage
      localStorage.setItem("isAuthenticated", "admin");
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Chuyển hướng đến trang admin
      this.props.navigate("/admin");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setFieldError("username", "Sai tài khoản hoặc mật khẩu");
      } else {
        setFieldError("username", "Lỗi kết nối tới server");
      }
    }
  };

  render() {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#f6f8ff]">
        <div className="bg-white p-8 rounded-lg w-[400px]">
          <Logo />
          <h2 className="text-xl font-semibold text-center mt-2 mb-6">
            Đăng nhập dành cho Admin
          </h2>
          <Formik
            initialValues={this.state.initFormValue}
            validationSchema={Yup.object({
              username: Yup.string().required("Username không được để trống"),
              password: Yup.string()
                .required("Password không được để trống")
                .min(6, "Password phải có ít nhất 6 ký tự"),
            })}
            onSubmit={this.handleSubmit}
          >
            {({ handleSubmit, touched, errors }) => (
              <Form onSubmit={handleSubmit}>
                <Field name="username">
                  {({ field }) => (
                    <InputField
                      label="Username"
                      type="text"
                      name="username"
                      {...field}
                      touched={touched.username}
                      error={errors.username}
                      className="mb-4 py-2 px-2 w-full"
                    />
                  )}
                </Field>
                <Field name="password">
                  {({ field }) => (
                    <InputField
                      label="Password"
                      type="password"
                      name="password"
                      {...field}
                      touched={touched.password}
                      error={errors.password}
                      className="mb-4 py-2 px-2 w-full"
                    />
                  )}
                </Field>
                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded mt-4"
                  type="submit"
                >
                  Đăng nhập
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default withNavigate(Login);
