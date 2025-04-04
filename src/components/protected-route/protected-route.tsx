import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { getIsAuthChecked, getUser } from "../../services/user/slice.ts";
import { Loading } from "../loading/loading.tsx";
import { useSelector } from "../../services/store.ts";

type ProtectedProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
}

const Protected: React.FC<ProtectedProps> = ({ onlyUnAuth = false, component}) => {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Loading container={true}/>;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: "/ "} };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
}

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({component}: {component: React.JSX.Element}): React.JSX.Element => (
  <Protected onlyUnAuth={true} component={component} />
);

