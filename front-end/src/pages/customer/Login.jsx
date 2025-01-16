import React, { Component } from "react";
import * as Yup from "yup";
import InputField from "../../components/shared/InputField";
import { Navigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import Logo from "../../components/shared/Logo";
import { withNavigate } from "../../hoc/withNavigate";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

class Login extends Component {
	static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      initFormValue: {
        username: "",
        password: "",
      },
    };
  }

  componentDidMount() {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "customer") {
      this.setState({ redirectToReferrer: true });
    }
  }

  handleSubmit = (values, { setFieldError }) => {
		const { setUser } = this.context;
    const customers = JSON.parse(localStorage.getItem("listCustomer")) || [];
    const user = customers.find(
      (u) => u.username === values.username && u.password === values.password
    );
    if (user) {
      localStorage.setItem("isAuthenticated", "customer");
      setUser(user); 
      this.props.navigate("/");
    } else {
      setFieldError("username", "Invalid username or password");
    }
  };

  render() {
    if (this.state.redirectToReferrer) {
      return <Navigate to="/" />;
    }

    return (
			<div className="flex flex-col justify-center items-center h-screen bg-[#f6f8ff]">
				<div className="bg-white rounded-lg p-8 w-[400px]">
					<Logo />
					<h2 className="text-xl font-semibold text-center mt-2 mb-6">
						Đăng nhập khách hàng
					</h2>
					<Formik
						initialValues={this.state.initFormValue}
						validationSchema={Yup.object({
							username: Yup.string().required("Username is required"),
							password: Yup.string()
								.required("Password is required")
								.min(6, "Password must be at least 6 characters"),
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
									className="w-full bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2.5 px-4 rounded mt-4"
									type="submit"
								>
									Đăng nhập
								</button>
								<p className="text-center text-sm mt-6">
									{"Nếu bạn chưa có tài khoản, vui lòng "}
									<Link to="/register" type="button" className="text-yellow-500">
										đăng kí
									</Link>
								</p>
							</Form>
						)}
					</Formik>
				</div>
			</div>	
    );
  }
}

export default withNavigate(Login);
