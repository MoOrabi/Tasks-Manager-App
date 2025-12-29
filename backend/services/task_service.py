from extensions import db
from models.task import Task


def get_user_tasks(user_id, page=1, per_page=10):
    query = (
        Task.query
        .filter_by(user_id=user_id)
        .order_by(Task.created_at.desc())
    )

    paginated = query.paginate(page=page, per_page=per_page, error_out=False)

    return {
        "items": [t.to_dict() for t in paginated.items],
        "page": paginated.page,
        "per_page": paginated.per_page,
        "total": paginated.total,
        "pages": paginated.pages,
        "has_next": paginated.has_next,
        "has_prev": paginated.has_prev,
    }


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
