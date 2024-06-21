import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "store";
import { getUserByTokenThunk } from "store/authService";

export const useAuth = () => {
  const { token, userLogin } = useSelector(
    (state: RootState) => state.authService
  );
  const dispatch = useAppDispatch();
  if (!userLogin) {
    dispatch(getUserByTokenThunk());
  }

  return { token, user: userLogin };
};
