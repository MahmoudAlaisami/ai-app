import React from "react";
import styles from "@/styles/logIn.module.css";
import { propsTypes, loginPropsTypes, User, loginFormProps, signUpFormProps, FormCombinedProps } from "@/utils/app.t";
import { emailRegex } from "@/utils/regex";
import { logIn, _signUp } from "@/utils/service";
import { Button, Form, Input, Image } from "antd";
import { useRouter } from "next/navigation";


// TODO: complete the functionality of logIn and signUp
//       check the return of the functions on onSignIn params 


// export const getServerSideProps = async () => {
//   const user = await logIn({ email, password });
  
//   return {
//     props: { user },
//   };
// }

const LogIn: React.FC<any> = ({ onSignIn, user }) => { 
  const router = useRouter()

  const handleLogin = async ({ email, password }: any) => {
    // check if email and password are empty
    if (!email || !password) {
      alert("enter your username or password");
      return;
    }

    // Handle login logic
    const user = await logIn({ email, password })
    console.log(".... user login", user);

    onSignIn(user);
  };

  const handleSignUp = () => {
    router.push('/signUp')
  };

  

  return (
    <div className={styles.container}>
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
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </div>
        </div>
      
    </div>
  );
};

export default LogIn;
