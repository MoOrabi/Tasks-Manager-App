import Login from "../components/Login";

export default function LoginPage() {
    return (
        <div className="container">
            <Login />
            <p>
                No account?
                <a href="/register"> Register</a>
            </p>
        </div>
    );
}