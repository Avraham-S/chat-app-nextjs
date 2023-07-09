export interface SignupFormInfo {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormInfo {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}
