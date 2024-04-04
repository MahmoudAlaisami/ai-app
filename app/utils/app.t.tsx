import { FormProps } from 'antd/lib/form';

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender?: string;
  birthDay?: string;
  id?: number;
}

export interface query {
  request: string;
  response: string;
}

export interface chat {
  title: string
  queries: Array<query>;
  time: Date;
}

export interface propsTypes {    //  CHECK THIS !!
  onSignIn: (props: any) => void;
};

export interface loginPropsTypes {
  email: string;
  password: string;
};

export type FormCombinedProps = loginPropsTypes | User;

export interface loginFormProps extends loginPropsTypes {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface signUpFormProps extends User {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface contentPropsTypes {
  user: User;  
  userData: Array<chat>;
  setUserData: Function;
  setUser: Function;
}

export interface sideBarProps {
  user: User;
  userData: Array<chat>;
  setUserData: Function;
  onSelect: Function;
  setUser: Function;
}

export interface chatPropsTypes {
  chatIndex: number;
  setUserData: Function;
  userData: Array<chat>;
}