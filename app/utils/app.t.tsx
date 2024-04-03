export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender?: string;
  birthDate?: Date;
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

export interface contentPropsTypes {
  user: User;  
  userData: Array<chat>;
  setUserData: Function;
}

export interface sideBarProps {
  user: User;
  userData: Array<chat>;
  setUserData: Function;
  onSelect: Function;
}

export interface chatPropsTypes {
  chat: chat;
  setUserData: Function;
}