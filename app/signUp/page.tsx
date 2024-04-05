import React from "react";
import styles from "@/styles/logIn.module.css";
import { propsTypes, loginPropsTypes, User, loginFormProps, signUpFormProps, FormCombinedProps } from "@/utils/app.t";
import { emailRegex } from "@/utils/regex";
import { logIn, _signUp } from "@/utils/service";
import { Button, Form, Input, Image } from "antd";



const signUp: React.FC<any> = () => {

  const handleSignUp = async ({ email, password, firstName, lastName, gender, birthDay }: User) => {
    console.log('.... sign up initiated',);
    if (!email || !password || !firstName || !lastName) {
      alert("fill in the required inputs marked by *");
      return;
    }
    

    // Handle SignUp logic
    const user = await _signUp({ email, password, firstName, lastName, gender, birthDay });

    console.log(".... ", user);
    onSignIn(user);
  };
  
  return (
    <div>
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
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
            className={styles.formItem}
          >
            <Input />
          </Form.Item>

          <Form.Item<User>
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
            className={styles.formItem}
          >
            <Input />
          </Form.Item>

          <Form.Item<User>
            label="Gender"
            name="gender"
            rules={[{ required: false, message: "Please input your gender!" }]}
            className={styles.formItem}
          >
            <Input />
          </Form.Item>

          <Form.Item<User>
            label="Birth Date"
            name="birthDay"
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
    </div>
  );
};

export default signUp;
