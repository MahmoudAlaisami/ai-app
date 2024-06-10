"use client"
import React from "react";
import styles from "@/styles/logIn.module.css";
import { propsTypes, loginPropsTypes, User, loginFormProps, signUpFormProps, FormCombinedProps } from "@/utils/app.t";
import { emailRegex, numRegex } from "@/utils/regex";
import { logIn, signUp } from "@/utils/service";
import { Button, Form, Input, Image } from "antd";
import { useRouter } from "next/navigation";


// TODO: handle unauthorized logins and signups

const LogIn: React.FC<any> = ({ onSignIn }) => { 
  const [isSignUp, setIsSignUp] = React.useState<boolean>(false);

  const handleLogin = async ({ email, password }: any) => {
    const user = await logIn({ email, password })
    onSignIn(user);
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp)
  };

  const handleSignUp = async ({ email, password, firstName, lastName, gender, age }: User) => {
    const user = await signUp({ email, password, firstName, lastName, gender, age });
    onSignIn(user);
  };

  return (
    <div className={styles.container}>
      {!isSignUp && (
        <div className={styles.formContainer}>
        
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
            <Form.Item<any>
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
              className={styles.formItem}
            >
              <Input />
            </Form.Item>

            <Form.Item<any>
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
              <Button type="primary" htmlType="submit" >
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
              onClick={toggleSignUp}
            >
              Sign Up
            </Button>
          </div>
        </div>
      )}
      {isSignUp &&(
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
          <Form.Item<any>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                pattern: new RegExp(emailRegex),
                message: "Please input a valid email address",
              },
            ]}
            className={styles.formItem}
          >
            <Input />
          </Form.Item>

          <Form.Item<any>
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 8 },
            ]}
            className={styles.formItem}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<any>
            label="First Name"
            name="firstName"
            className={styles.formItem}
          >
            <Input />
          </Form.Item>

          <Form.Item<User>
            label="Last Name"
            name="lastName"
            className={styles.formItem}
          >
            <Input />
          </Form.Item>

          <Form.Item<User>
            label="Gender"
            name="gender"
            className={styles.formItem}
          >
            <Input />
          </Form.Item>

          <Form.Item<User>
            label="Age"
            name="age"
            rules={[{
              pattern: new RegExp(numRegex), 
              message: "Please input a number only",
            }]}
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
