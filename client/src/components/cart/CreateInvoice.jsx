import { Card, Form, Input, Modal, Select, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../store/cartSlice";

const CreateInvoice = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await fetch(process.env.REACT_APP_SERVER_URL + "/api/invoices/add-invoice", {
        method: 'POST',
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });
      message.info('Cart has been emptied.');
      message.success('Invoice created.');
      setIsModalOpen(false);
      dispatch(reset());
      navigate('/invoices')

    } catch (error) {
      message.error('Something went wrong!');
      console.log(error);
    }
  };

  return (
    <Modal
      title="Create Invoice"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form layout={"vertical"} className="pt-5" onFinish={onFinish}>
        <Form.Item
          label="Customer"
          name={"customerName"}
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter customer name.." />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name={"customerPhoneNumber"}
          rules={[{ required: true }]}
          className="my-10"
        >
          <Input placeholder="Enter phone number.." />
        </Form.Item>

        <Form.Item label="Payment Options" name={"paymentMode"} rules={[{ required: true }]}>
          <Select
            placeholder="Chose a payment option.."
            options={[
              {
                value: 'cash',
                label: 'Cash',
              },
              {
                value: 'credit card',
                label: 'Credit Card'
              }
            ]}
          />
        </Form.Item>
        <Card className="border border-gray-300">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="">{cart.total}$</span>
          </div>
          <div className="flex justify-between my-2">
            <span>Total Tax 8% :</span>
            <span className="text-red-600">+{((cart.total * cart.tax) / 100).toFixed(2)}$</span>
          </div>
          <div className="flex justify-between">
            <b>Total:</b>
            <b className="">{(cart.total + (cart.total * cart.tax) / 100).toFixed(2)}$</b>
          </div>
          <div className="flex justify-end">
            <Button
              htmlType="sumbit"
              type="primary"
              size="large"
              className="mt-3"
              onClick={() => setIsModalOpen(true)}
              disabled={cart.cartItems.length === 0}
            >
              Create Order
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  )
}

export default CreateInvoice;
