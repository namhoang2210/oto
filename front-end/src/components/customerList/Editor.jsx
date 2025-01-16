import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditCustomerModal = ({ customer, onSave, onClose }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Tên khách hàng không được để trống"),
    email: Yup.string().email("Email không hợp lệ").required("Email không được để trống"),
    phone: Yup.string().required("Số điện thoại không được để trống"),
    address: Yup.string().required("Địa chỉ không được để trống"),
  });

  return (
    <Formik
      initialValues={{
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSave({ ...customer, ...values });
      }}
    >
      {({ isSubmitting }) => (
        <Form className="w-[400px]">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tên khách hàng</label>
            <Field
              type="text"
              name="name"
              className="border rounded-lg p-2 w-full"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <Field
              type="email"
              name="email"
              className="border rounded-lg p-2 w-full"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Số điện thoại</label>
            <Field
              type="text"
              name="phone"
              className="border rounded-lg p-2 w-full"
            />
            <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Địa chỉ</label>
            <Field
              type="text"
              name="address"
              className="border rounded-lg p-2 w-full"
            />
            <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-1" />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
            >
              Lưu
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditCustomerModal;
