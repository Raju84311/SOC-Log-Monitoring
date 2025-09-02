from flask import Flask, jsonify
from flask_cors import CORS
from models import Log
from database import SessionLocal

app = Flask(__name__)
CORS(app)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200

@app.route("/alerts", methods=["GET"])
def get_alerts():
    session = SessionLocal()
    logs = session.query(Log).order_by(Log.timestamp.desc()).all()
    session.close()

    alerts_list = []
    for log in logs:
        alerts_list.append({
            "id": log.id,
            "source": log.source,
            "message": log.message,
            "level": log.level,
            "timestamp": log.timestamp.strftime("%Y-%m-%d %H:%M:%S")
        })
    return {"alerts": alerts_list}, 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)

