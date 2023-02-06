import { Button, Carousel, Checkbox, Form, Input, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      const user = await res.json();

      if (res.status === 200) {
        localStorage.setItem("posUser", JSON.stringify({ username: user.username, email: user.email }));
        message.success("Login successful.");
        navigate("/");

      } else if (res.status === 404) {
        message.error("User not found!");

      } else if (res.status === 403) {
        message.error("Wrong password!");
      }
      setLoading(false);

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
          <h1 className="text-center text-5xl font-bold mb-16">POS App</h1>
          <Form layout="vertical" onFinish={onFinish} initialValues={{ remember: false, }}>
            <Form.Item label="E-mail" name={"email"} rules={[{ required: true }]} className="clear-both">
              <Input className="max-w-[200px] sm:float-right" />
            </Form.Item>
            <Form.Item label="Password" name={"password"} rules={[{ required: true }]} className="clear-both">
              <Input.Password className="max-w-[200px] sm:float-right" />
            </Form.Item>
            <Form.Item>
              <div className="flex flex-col items-center gap-y-4">
                <Checkbox>Remember me.</Checkbox>
                <Link to={"/"}>Forgot password?</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" loading={loading} className="w-full mt-4">Log In</Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute bottom-10 w-full">
            New user? <Link to={"/register"} className="text-blue-700 ml-2">sign up.</Link>
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

export default LoginPage;
