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
    if (user?.isPremium === true || staff || user?.accountType === "staff") {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return <LoadingComponennt />;
};

export const StaffOnly = () => {
  const user = useSelector((state) => state.userSlice?.user);
  const staff = useSelector((state) => state.formSlice?.staff);

  const isPermittedToMakeDates =
    user?.accountType === "staff" || staff !== null;

  console.log(isPermittedToMakeDates);

  const loadingUserProfile = useSelector(
    (state) => state.userSlice.loadingUserProfile
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(loadingUserProfile);
  }, [loadingUserProfile]);

  if (!loading) {
    return isPermittedToMakeDates ? <Outlet /> : <Navigate to="/" />;
  } else {
    return <LoadingComponennt />;
  }
};

export default PrivateRoutes;
