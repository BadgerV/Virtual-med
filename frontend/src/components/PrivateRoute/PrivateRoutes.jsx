import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const user = useSelector((state) => state.userSlice.user);
  const loadingUserProfile = useSelector(
    (state) => state.userSlice.loadingUserProfile
  );

  if (!loadingUserProfile) {
    return user ? <Outlet /> : <Navigate to="/signup" />;
  }
};

export default PrivateRoutes;
