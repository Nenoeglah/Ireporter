from flask import Flask, make_response, jsonify, request, redirect, url_for
from flask_migrate import Migrate
from models import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)

db.init_app(app)

@app.route('/reports')
def reports():
    reports_list = []
    reports = Report.query.all()
    for report in reports:
        report_dict = {
            "id": report.id,
            "title": report.title,
            "description": report.description,
            "location": report.location,
            "category": report.category
        }
        reports_list.append(report_dict)
    response_body = reports_list
    response = make_response(jsonify(response_body), 200)
    return response

@app.route('/reports/<int:id>', methods = ["GET", "DELETE"])
def report_id(id):
    report = Report.query.filter_by(id=id).first()
    if report:
        if request.method == "GET":
            response_body = {
                "id": report.id,
                "title": report.title,
                "description": report.description,
                "location": report.location,
                "category": report.category
            }
            response = make_response(jsonify(response_body), 200)

        elif response.method == "DELETE":
            db.session.delete(report)
            db.session.commit()
            response_body = {"message": "Report deleted!"}
            response = make_response(response_body, 200)

    else:
        response_body = {"error": "Report not found"}
        response = make_response(jsonify(response_body))

    return response