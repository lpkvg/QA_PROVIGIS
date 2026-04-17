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

export type BmiInput = {
  gender: 'Male' | 'Female';
  age: number;
  height: number;
  weight: number;
};

export const BMI_INPUT: BmiInput = {
  gender: 'Male',
  age: 45,
  height: 170,
  weight: 65,
};
