import { httpRequest } from "./http.service";

type RegisterBody = {
  fullname: string;
  email: string;
  pswd: string;
};

type LoginBody = {
  email: string;
  pswd: string;
};

type AuthResponse = {
  message: string;
  statusCode: number;
  object: {
    token: string;
    email: string;
    userId: number;
  };
};

export async function login(body: LoginBody): Promise<AuthResponse> {
  return await httpRequest<AuthResponse>({
    method: "POST",
    endpoint: "/auth/login",
    body,
  });
}

type WelcomeResponse = {
  message: string;
};

export async function register(body: RegisterBody): Promise<void> {
  await httpRequest<void>({
    method: "POST",
    endpoint: "/auth/register",
    body,
  });
}


export async function getWelcome(token: string): Promise<WelcomeResponse> {
  return await httpRequest<WelcomeResponse>({
    method: "GET",
    endpoint: "/welcome",
    token,
  });
}