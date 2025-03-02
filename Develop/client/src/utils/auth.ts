import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.exp ? decoded.exp * 1000 < Date.now() : true;
  }

  getToken(): string {
    return localStorage.getItem("jwt_token") || "";
  }

  login(idToken: string) {
    localStorage.setItem("jwt_token", idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("jwt_token");
    window.location.assign("/login");
  }
}

export default new AuthService();
