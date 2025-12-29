from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.task_service import *

task_bp = Blueprint("tasks", __name__, url_prefix="/tasks")


@task_bp.get("")
@jwt_required()
def list_tasks():
    user_id = get_jwt_identity()
    page = int(request.args.get("page", 1))
    per_page = int(request.args.get("per_page", 10))

    return jsonify(get_user_tasks(user_id, page, per_page))


@task_bp.post("/")
@jwt_required()
def create():
    user_id = get_jwt_identity()
    data = request.json
    title = data.get("title")
    description = data.get("description")

    if not title or not title.strip() or not description or not description.strip():
        return jsonify({"message": "Task Title and description shouldn't be empty"}), 400

    task = create_task(user_id, title, description)
    return jsonify({"message": "Task created", "id": task.id}), 201


@task_bp.put("/<int:task_id>")
@jwt_required()
def update(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id, user_id=user_id).first_or_404()
    update_task(task, request.json)
    return jsonify({"message": "Task updated"})


@task_bp.delete("/<int:task_id>")
@jwt_required()
def delete(task_id):
    user_id = get_jwt_identity()
    task = Task.query.filter_by(id=task_id, user_id=user_id).first_or_404()
    delete_task(task)
    return jsonify({"message": "Task deleted"})
