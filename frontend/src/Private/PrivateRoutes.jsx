import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoutes = ({element}) => {
    const token = localStorage.getItem('accessToken');
  return token ? element : <Navigate to={"/auth"} />
}

export default PrivateRoutes