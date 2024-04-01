export interface propsTypes {
  onSignIn: (props: any) => void;
};

export interface loginPropsTypes {
  email: string;
  password: string;
};

export interface signupPropsTypes {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender?: string;
  birthDate?: Date;
}

export interface contentPropsTypes {
  user: any;
  userData: any;
  setUserData: any;
}
