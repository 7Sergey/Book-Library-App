import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { clearError, selectErrorMessage } from "../../redux/slices/errorSlice";
import { useEffect } from "react";

const Error = () => {
  const errorMessage = useSelector(selectErrorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorMessage) {
      toast.warn(errorMessage);
      dispatch(clearError());
    }
  }, [errorMessage, dispatch]);
  return <ToastContainer position="top-right" autoClose={2000} />;
};

export default Error;
