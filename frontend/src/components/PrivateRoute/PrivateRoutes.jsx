import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import LoadingComponennt from "../LoadingComponent/LoadingComponent";

const PrivateRoutes = () => {
  const user = useSelector((state) => state.userSlice.user);
  const loadingUserProfile = useSelector(
    (state) => state.userSlice.loadingUserProfile
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(loadingUserProfile);
  }, [loadingUserProfile]);

  if (!loading) {
    return user ? <Outlet /> : <Navigate to="/signup" />;
  }

  return <LoadingComponennt />;
};

export const PremiumUsersOnly = () => {
  const user = useSelector((state) => state.userSlice?.user);
  const staff = useSelector((state) => state.formSlice?.staff);

  const loadingUserProfile = useSelector(
    (state) => state.userSlice.loadingUserProfile
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(loadingUserProfile);
  }, [loadingUserProfile]);

  if (!loading) {
    if (user?.isPremium === true || staff) {
      return <Outlet />;
    } else {
      <Navigate to="/" />;
    }
    return <LoadingComponennt />;
  }
  return <LoadingComponennt />;
};

export default PrivateRoutes;
