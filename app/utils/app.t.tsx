import { FormProps } from 'antd/lib/form';

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender?: string;
  age?: number;
  _id?: string;
  token?: string;
  loggedInAt?: Date;
}

export interface query {
  prompt: string;
  completion: string;
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
  refresh: Function;
  logOut: Function;
}

export interface sideBarProps {
  user: User;
  userData: Array<chat>;
  refresh: Function;
  onSelect: Function;
  logOut: Function;
}

export interface chatPropsTypes {
  chatIndex: number;
  refresh: Function;
  userData: Array<chat>;
}

export interface chatEditTypes {
  chat: chat;
  index: number;
  refresh: Function;
  userData: Array<chat>;
  onDelete: Function;
}