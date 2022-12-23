export const patterns = {
  regName: /^[A-Za-z]+$/,
  regEmail: /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/,
  regPassword: /^\d{8}$/,
};

export const formErrorMsgs = {
  nameError: "Name should not be blank and should contain only letters",
  emailError: "Enter valid email",
  passwordError: "Password should be of minimum 10 characters",
};

export const registerLoginForm = {
  registerSuccess: "Registered Successfully..! You can login now",
  registerFailure: "Something went wrong..! Please try agaim later",
  loginFailure: "Invalid Credentials",
};
