import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "../store/Reducers/authReducer";
import { fetch_card_items } from "../store/Reducers/CardReducer";
import { useSelector } from "react-redux";
const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetch_card_items());
    }
  }, [isAuthenticated, dispatch]);

  return children;
};

export default AuthProvider;
