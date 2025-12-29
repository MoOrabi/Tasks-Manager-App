import Register from "../components/Register";

export default function RegisterPage() {
    return (
        <div className="container">
            <Register />
            <p>
                Already have an account?
                <a href="/login"> Login</a>
            </p>
        </div>
    );
}
