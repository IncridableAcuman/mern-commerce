import { Navigate } from "react-router-dom";

const PrivateRoutes = ({element}) => {
    const token = localStorage.getItem('accessToken');
  return token ? element : <Navigate to={"/auth"} />
}

export default PrivateRoutes