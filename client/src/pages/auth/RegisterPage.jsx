import { Button, Carousel, Form, Input, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      if (res.status === 200) {
        message.success("Registration successful.");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      message.error("Something went wrong!");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="relative flex flex-col h-full justify-center items-center px-10 mx-auto | xl:mx-16 xl:px-20">
          <h1 className="text-center text-5xl font-bold mb-10">POS App</h1>
          <Form layout="vertical" className="max-w-[200px]" onFinish={onFinish}>
            <Form.Item label="User Name" name={"username"} rules={[{ required: true }]}>
              <Input className="max-w-[200px] sm:float-right" />
            </Form.Item>
            <Form.Item label="E-mail" name={"email"} rules={[{ required: true }]} className="clear-both">
              <Input className="max-w-[200px] sm:float-right" />
            </Form.Item>
            <Form.Item label="Password" name={"password"} rules={[{ required: true }]} className="clear-both">
              <Input.Password className="max-w-[200px] sm:float-right" />
            </Form.Item>
            <Form.Item
              label="Password Again"
              name={"passwordAgain"}
              dependencies={['password']}
              className="clear-both"
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password className="max-w-[200px] sm:float-right" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" loading={loading} className="w-full mt-7">Sign Up</Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute bottom-10 w-full">
            <span>Already registered?</span> <Link to={"/login"} className="text-blue-700 ml-2">Log In.</Link>
          </div>
        </div>
        <div className="xl:w-4/6 min-w-[800px] bg-[#6c63ff] hidden | xl:block">
          <div className="w-full">
            <Carousel autoplay className="">
              <div className="!flex flex-col justify-center items-center h-full">
                <img src="/images/admin.svg" alt="carousel-images" className="w-[600px] h-[500px]" />
                <h3 className="text-4xl text-white text-center">Administer</h3>
                <p className="mt-5 text-2xl text-white text-center pb-12">Authorizations that you can manage your application</p>
              </div>
              <div className="!flex flex-col justify-center items-center h-full">
                <img src="/images/customer.svg" alt="carousel-images" className="w-[600px] h-[500px]" />
                <h3 className="text-4xl text-white text-center">Customer</h3>
                <p className="mt-5 text-2xl text-white text-center pb-12">Always happier customers.</p>
              </div>
              <div className="!flex flex-col justify-center items-center h-full">
                <img src="/images/responsive.svg" alt="carousel-images" className="w-[600px] h-[500px]" />
                <h3 className="text-4xl text-white text-center">Responsive</h3>
                <p className="mt-5 text-2xl text-white text-center pb-16">Compatibility with all device sizes.</p>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage;
