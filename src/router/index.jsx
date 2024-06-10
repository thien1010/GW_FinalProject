import { AuthLayout } from "../components";
import {PATH} from "../constant"
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
