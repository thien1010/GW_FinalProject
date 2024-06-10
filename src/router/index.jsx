import AuthLayout from "../components/layouts/AuthLayout";
import { PATH } from "../constant";

export const router = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: PATH.login,
      },
      {
        path: PATH.register,
      },
    ],
  },
];
