import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/shared/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const authed = isAuthenticated();

  // Nếu chưa đăng nhập → redirect về /connect
  if (!authed) {
    return <Navigate to="/connect" replace />;
  }

  // Nếu đã đăng nhập → render nội dung bên trong
  return <>{children}</>;
}
