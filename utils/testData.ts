export type LoginCredentials = {
  username: string;
  password: string;
};

export const validCredentials: LoginCredentials = ({
    username:'practice',
    password:'SuperSecretPassword!'
})

export type RegisterCredentials = {
  username: string;
  password: string;
  confirmPassword: string;
};

export const validRegisterCredentials: RegisterCredentials = ({
  username: `ThisIsUsername`,
  password: 'ThisIsUsername123!',
  confirmPassword: 'ThisIsUsername123!',
});