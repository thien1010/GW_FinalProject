import { Login, Register } from "pages";
import { AuthLayout } from "../components";
import { PATH } from "constant";

export const router = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: PATH.login,
        element: <Login />,
      },
      {
        path: PATH.register,
        element: <Register />,
      },
    ],
  },
];
