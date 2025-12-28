from models.user import User
from extensions import db


def register_user(name, email, password):
    if User.query.filter_by(email=email).first():
        return None, "Email already registered"

    user = User(name=name, email=email)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return user, None
