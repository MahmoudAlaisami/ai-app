import React from "react";
import styles from "@/styles/logIn.module.css";
import { propsTypes, loginPropsTypes, User } from "@/utils/app.t";
import { emailRegex } from "@/utils/regex";
import { logIn, _signUp } from "@/utils/service";
import { Button, Form, Input, Image } from "antd";

// TODO: complete the functionality of logIn and signUp
//       check the return of the functions on onSignIn params 

const LogIn: React.FC<propsTypes> = ({ onSignIn }) => { 
  const [signUp, setSignUp] = React.useState<boolean>(false);
  // const router = useRouter();

  const handleLogin = async ({ email, password }: loginPropsTypes) => {
    // check if email and password are empty
    if (!email || !password) {
      alert("enter your username or password");
      return;
    }

    // Handle login logic
    const response = await logIn({ email, password });
    // const response = {user, token}
    console.log(".... ", { email, password });
    // localStorage.set("token", token)
    onSignIn(true);
    // const data = await getUserData({email, token})
    // setUserData(data)
  };

  const handleSignForm = () => {
    setSignUp(!signUp)
  };

  const handleSignUp = async ({
    email,
    password,
    firstName,
    lastName,
    gender,
    birthDate,
  }: User) => {
    if (!email || !password || !firstName || !lastName) {
      alert("fill in the required inputs marked by *");
      return;
    }

    // Handle SignUp logic
    const response = await _signUp({
      email,
      password,
      firstName,
      lastName,
      gender,
      birthDate,
    });

    console.log(".... ", {
      email,
      password,
      firstName,
      lastName,
      gender,
      birthDate,
    });
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
            <Form.Item<User>
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { pattern: new RegExp(emailRegex), message: "Please input a valid email address" },
              ]}
              className={styles.formItem}
            >
              <Input />
            </Form.Item>

            <Form.Item<User>
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

            <Form.Item<User>
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
              rules={[
                { required: false, message: "Please input your gender!" },
              ]}
              className={styles.formItem}
            >
              <Input />
            </Form.Item>

            <Form.Item<User>
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
