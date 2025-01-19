import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import InputField from '../shared/InputField';
import SelectField from '../shared/SelectField';
import Modal from '../shared/Modal';
import API from '../../api';

class ProductEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        code: '',
        price: '',
        monthly_cost: '',
        model: '',
        image: '',
        distance_travelled: '',
        seats: '',
        gearbox: '',
        fuel_type: '',
        license_plate: '',
        location: '',
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.product && prevProps.product !== this.props.product) {
      this.setState({
        initialValues: {
          code: this.props.product.code || '',
          price: this.props.product.price || '',
          monthly_cost: this.props.product.monthly_cost || '',
          model: this.props.product.model || '',
          image: this.props.product.image || '',
          distance_travelled: this.props.product.distance_travelled || '',
          seats: this.props.product.seats || '',
          gearbox: this.props.product.gearbox || '',
          fuel_type: this.props.product.fuel_type || '',
          license_plate: this.props.product.license_plate || '',
          location: this.props.product.location || '',
        },
      });
    }
  }


  handleSubmit = (values, { resetForm }) => {
    const { product } = this.props;
  
    if (product) {
      // Cập nhật sản phẩm
      API.put(`/products/${product._id}`, values)
        .then((_response) => {
          this.props.updateProductList();
        })
        .catch((error) => {
          console.error('Error updating product:', error);
        });
    } else {
      // Thêm sản phẩm mới
      API.post('/products', values)
        .then((_response) => {
          this.props.updateProductList();
        })
        .catch((error) => {
          console.error('Error creating product:', error);
        });
    }
  
    resetForm();
    this.props.toggleModal();
  };
  
  render() {
    const { isModalOpen, toggleModal } = this.props;

    return (
      <div>
        {isModalOpen && (
          <Modal title={this.props.product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'} onClose={toggleModal}>
            <Formik
              initialValues={this.state.initialValues}
              enableReinitialize={true}
              validationSchema={Yup.object({
                code: Yup.string().required('Mã sản phẩm là bắt buộc'),
                price: Yup.string().required('Giá là bắt buộc'),
                monthly_cost: Yup.string().required('Chi phí hàng tháng là bắt buộc'),
                model: Yup.string().required('Tên sản phẩm là bắt buộc'),
                image: Yup.string().url('Phải là một URL hợp lệ').required('Ảnh là bắt buộc'),
                distance_travelled: Yup.string().required('Quãng đường đã đi là bắt buộc'),
                seats: Yup.string().required('Số ghế là bắt buộc'),
                gearbox: Yup.string().required('Hộp số là bắt buộc'),
                fuel_type: Yup.string().required('Loại nhiên liệu là bắt buộc'),
                license_plate: Yup.string().required('Biển số là bắt buộc'),
                location: Yup.string().required('Chi nhánh là bắt buộc'),
              })}
              onSubmit={this.handleSubmit}
            >
              {({ touched, errors }) => (
                <Form>
                  <div className="flex justify-between gap-6 mb-4">
                    <Field name="code">
                      {({ field }) => (
                        <InputField
                          label="Mã sản phẩm"
                          type="text"
                          {...field}
                          touched={touched.code}
                          error={errors.code}
                        />
                      )}
                    </Field>

                    <Field name="price">
                      {({ field }) => (
                        <InputField
                          label="Giá"
                          type="text"
                          {...field}
                          touched={touched.price}
                          error={errors.price}
                        />
                      )}
                    </Field>
                  </div>

                  <div className="flex justify-between gap-6 mb-4">
                    <Field name="monthly_cost">
                      {({ field }) => (
                        <InputField
                          label="Chi phí hàng tháng"
                          type="text"
                          {...field}
                          touched={touched.monthly_cost}
                          error={errors.monthly_cost}
                        />
                      )}
                    </Field>

                    <Field name="model">
                      {({ field }) => (
                        <InputField
                          label="Tên sản phẩm"
                          type="text"
                          {...field}
                          touched={touched.model}
                          error={errors.model}
                        />
                      )}
                    </Field>
                  </div>

                  <div className="flex justify-between gap-6 mb-4">
                    <Field name="image">
                      {({ field }) => (
                        <InputField
                          label="Ảnh (URL)"
                          type="text"
                          {...field}
                          touched={touched.image}
                          error={errors.image}
                        />
                      )}
                    </Field>

                    <Field name="distance_travelled">
                      {({ field }) => (
                        <InputField
                          label="Quãng đường đã đi (km)"
                          type="text"
                          {...field}
                          touched={touched.distance_travelled}
                          error={errors.distance_travelled}
                        />
                      )}
                    </Field>
                  </div>

                  <div className="flex justify-between gap-6 mb-4">
                    <Field name="seats">
                      {({ field }) => (
                        <SelectField
                          label="Số ghế"
                          options={[
                            { value: '5 chỗ', label: '5 chỗ' },
                            { value: '7 chỗ', label: '7 chỗ' },
                            { value: '16 chỗ', label: '16 chỗ' },
                          ]}
                          {...field}
                          touched={touched.seats}
                          error={errors.seats}
                        />
                      )}
                    </Field>

                    <Field name="gearbox">
                      {({ field }) => (
                        <SelectField
                          label="Hộp số"
                          options={[
                            { value: 'CVT', label: 'CVT' },
                            { value: 'Số tự động', label: 'Số tự động' },
                          ]}
                          {...field}
                          touched={touched.gearbox}
                          error={errors.gearbox}
                        />
                      )}
                    </Field>
                  </div>

                  <div className="flex justify-between gap-6 mb-4">
                    <Field name="fuel_type">
                      {({ field }) => (
                        <SelectField
                          label="Loại nhiên liệu"
                          options={[
                            { value: 'Xe Xăng', label: 'Xe Xăng' },
                            { value: 'Xe Dầu', label: 'Xe Dầu' },
                            { value: 'Xe Điện', label: 'Xe Điện' },
                          ]}
                          {...field}
                          touched={touched.fuel_type}
                          error={errors.fuel_type}
                        />
                      )}
                    </Field>

                    <Field name="license_plate">
                      {({ field }) => (
                        <InputField
                          label="Biển số"
                          type="text"
                          {...field}
                          touched={touched.license_plate}
                          error={errors.license_plate}
                        />
                      )}
                    </Field>
                  </div>

                  <Field name="location">
                    {({ field }) => (
                      <SelectField
                        label="Chi nhánh"
                        options={[
                          { value: 'CN Hà Nội', label: 'CN Hà Nội' },
                          { value: 'CN Hải Phòng', label: 'CN Hải Phòng' },
                          { value: 'CN Đã Nẵng', label: 'CN Đã Nẵng' },
                          { value: 'CN TP.HCM', label: 'CN TP.HCM' },
                          { value: 'CN Tân Phú', label: 'CN Tân Phú' },
                          { value: 'CN Cần Thơ', label: 'CN Cần Thơ' },
                          { value: 'CN Biên Hòa', label: 'CN Biên Hòa' },
                        ]}
                        {...field}
                        touched={touched.location}
                        error={errors.location}
                      />
                    )}
                  </Field>

                  <div className="flex justify-center gap-3 mt-6">
                    <button
                      type="submit"
                      className="text-white border bg-blue-500 border-blue-500 hover:bg-blue-600 font-medium rounded-md text-sm px-5 py-2 text-center"
                    >
                      {this.props.product ? 'Sửa' : 'Thêm'}
                    </button>
                    <button
                      type="button"
                      onClick={toggleModal}
                      className="text-red-500 hover:text-white border border-red-500 hover:bg-red-600 font-medium rounded-md text-sm px-5 py-2 text-center"
                    >
                      Hủy
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal>
        )}
      </div>
    );
  }
}

export default ProductEditor;
