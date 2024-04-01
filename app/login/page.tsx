import React from "react";
import styles from "@/styles/logIn.module.css";
import { propsTypes, loginPropsTypes, signupPropsTypes } from "@/types/app.t";
import {logIn, _signUp} from "@/service"
import { Button, Form, Input, Image } from "antd";

// TODO: complete the functionality of logIn and signUp
//       check the return of the functions on onSignIn params

const LogIn: React.FC<propsTypes> = ({ onSignIn }) => {
  const[signUp, setSignUp] = React.useState<boolean>(false)
  // const router = useRouter();

  const handleLogin = async ({ email, password }: loginPropsTypes) => {
    // check if email and password are empty
    if (!email || !password) {
      alert("enter your username or password");
      return;
    }

    // Handle login logic
    const response = await logIn({email, password})
    console.log(".... ", { email, password });
    onSignIn(true);
  };

  const handleSignForm = () => {
    setSignUp(!signUp)
  }

  const handleSignUp = async ({email, password, firstName, lastName, gender, birthDate}: signupPropsTypes) => {
    if(!email || !password || !firstName || !lastName) {
      alert('fill in the required inputs marked by *')
      return 
    }

    // Handle SignUp logic
    const response = await _signUp({email, password, firstName, lastName, gender, birthDate})

    console.log(".... ", {email, password, firstName, lastName, gender, birthDate});
    onSignIn(true);
  };

  return (
    <div className={styles.container}>
      {!signUp && (
        <div className={styles.formContainer}>
        {/* <div className={styles.welcome}>Welcome back!</div> */}
        
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          className={styles.form}
          initialValues={{ remember: true }}
          onFinish={handleLogin}
          onFinishFailed={() => {}}
          autoComplete="off"
        >
          <Form.Item<loginPropsTypes>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
            className={styles.formItem}
          >
            <Input />
          </Form.Item>
          <Form.Item<loginPropsTypes>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}
            className={styles.formItem}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.signUpContainer}>
          <div className={styles.or}>or</div>
          <br />
          <Button
            type="default"
            className={styles.signUpButton}
            onClick={handleSignForm}
          >
            Sign Up
          </Button>
        </div>
      </div>
      )}

      {signUp && (
        <div className={styles.formContainer}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          className={styles.form}
          initialValues={{ remember: true }}
          onFinish={handleSignUp}
          onFinishFailed={() => {}}
          autoComplete="off"
        >
          <Form.Item<signupPropsTypes>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
            className={styles.formItem}
          >
            <Input />
          </Form.Item>

          <Form.Item<signupPropsTypes>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            className={styles.formItem}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<signupPropsTypes>
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
            className={styles.formItem}
          >
            <Input />
          </Form.Item>

          <Form.Item<signupPropsTypes>
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
            className={styles.formItem}
          >
            <Input />
          </Form.Item>

          <Form.Item<signupPropsTypes>
            label="Gender"
            name="gender"
            rules={[{ required: false, message: "Please input your gender!" }]}
            className={styles.formItem}
          >
            <Input />
          </Form.Item>

          <Form.Item<signupPropsTypes>
            label="Birth Date"
            name="birthDate"
            rules={[
              { required: false, message: "Please input your birth date!" },
            ]}
            className={styles.formItem}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
      )}
    </div>
  );
};

export default LogIn;
