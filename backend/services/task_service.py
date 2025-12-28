from models.task import Task
from extensions import db


def get_user_tasks(user_id):
    return Task.query.filter_by(user_id=user_id).order_by(Task.created_at.desc()).all()


def create_task(user_id, title, description):
    task = Task(user_id=user_id, title=title, description=description)
    db.session.add(task)
    db.session.commit()
    return task


def update_task(task, data):
    task.title = data.get("title", task.title)
    task.description = data.get("description", task.description)
    task.status = data.get("status", task.status)
    db.session.commit()
    return task


def delete_task(task):
    db.session.delete(task)
    db.session.commit()
