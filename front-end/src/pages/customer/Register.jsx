import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputField from "../../components/shared/InputField";
import { withNavigate } from "../../hoc/withNavigate";
import Logo from "../../components/shared/Logo";
import { UserContext } from "../../contexts/userContext";

class Register extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      initFormValue: {
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        email: "",
        phone: "",
        address: "",
      },
    };
  }

  handleSubmit = (values, { setFieldError }) => {
    const { setUser } = this.context;

    let customersData = JSON.parse(localStorage.getItem("listCustomer")) || [];

    const existingUser = customersData.find(
      (u) => u.username === values.username
    );
    if (existingUser) {
      setFieldError("username", "Username already exists");
      return;
    }

    const newUser = {
      id: customersData.length
        ? Math.max(...customersData.map((u) => u.id)) + 1
        : 1,
      username: values.username,
      password: values.password,
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
      created_at: new Date().toISOString(),
    };

    customersData.push(newUser);

    localStorage.setItem("listCustomer", JSON.stringify(customersData));
		localStorage.setItem("isAuthenticated", "customer");
    setUser(newUser); 
    this.props.navigate("/");
  };

  render() {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#f6f8ff]">
        <div className="bg-white p-8 rounded-lg ">
          <Logo />
          <h2 className="text-xl font-semibold text-center mt-2 mb-6">
            Đăng ký tài khoản mới
          </h2>
          <Formik
            initialValues={this.state.initFormValue}
            validationSchema={Yup.object({
              username: Yup.string().required("Vui lòng điền username"),
              password: Yup.string()
                .required("Vui lòng nhập mật khẩu")
                .min(6, "Mật khẩu phải có tối thiểu 6 kí tự"),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
                .required("Vui lòng nhập lại mật khẩu"),
              name: Yup.string().required("Vui lòng nhập tên"),
              email: Yup.string()
                .email("Email không đúng định dạng")
                .required("Vui lòng nhập email"),
              phone: Yup.string().required("Vui lòng nhập số điện thoại"),
              address: Yup.string().required("Vui lòng nhập địa chỉ"),
            })}
            onSubmit={this.handleSubmit}
          >
            {({ handleSubmit, touched, errors }) => (
              <Form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div>
                    <Field name="username">
                      {({ field }) => (
                        <InputField
                          label="Username"
                          type="text"
                          name="username"
                          {...field}
                          touched={touched.username}
                          error={errors.username}
                          className="py-2 px-2 w-full"
                        />
                      )}
                    </Field>
                    <Field name="password">
                      {({ field }) => (
                        <InputField
                          label="Mật khẩu"
                          type="password"
                          name="password"
                          {...field}
                          touched={touched.password}
                          error={errors.password}
                          className="py-2 px-2 w-full"
                        />
                      )}
                    </Field>
                    <Field name="confirmPassword">
                      {({ field }) => (
                        <InputField
                          label="Nhập lại mật khẩu"
                          type="password"
                          name="confirmPassword"
                          {...field}
                          touched={touched.confirmPassword}
                          error={errors.confirmPassword}
                          className="py-2 px-2 w-full"
                        />
                      )}
                    </Field>
                  </div>
                  <div>
                    <Field name="name">
                      {({ field }) => (
                        <InputField
                          label="Họ tên"
                          type="text"
                          name="name"
                          {...field}
                          touched={touched.name}
                          error={errors.name}
                          className="py-2 px-2 w-full"
                        />
                      )}
                    </Field>
                    <Field name="email">
                      {({ field }) => (
                        <InputField
                          label="Email"
                          type="email"
                          name="email"
                          {...field}
                          touched={touched.email}
                          error={errors.email}
                          className="py-2 px-2 w-full"
                        />
                      )}
                    </Field>
                    <Field name="phone">
                      {({ field }) => (
                        <InputField
                          label="Số điện thoại"
                          type="text"
                          name="phone"
                          {...field}
                          touched={touched.phone}
                          error={errors.phone}
                          className="py-2 px-2 w-full"
                        />
                      )}
                    </Field>
                    <Field name="address">
                      {({ field }) => (
                        <InputField
                          label="Địa chỉ"
                          type="text"
                          name="address"
                          {...field}
                          touched={touched.address}
                          error={errors.address}
                          className="py-2 px-2 w-full"
                        />
                      )}
                    </Field>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    className="w-[70%] bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2.5 px-4 rounded mt-12"
                    type="submit"
                  >
                    Đăng ký
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default withNavigate(Register);
