import { logout } from "../store/ducks/auth";

export default function Logout() {
    localStorage.clear();
    return logout();
}