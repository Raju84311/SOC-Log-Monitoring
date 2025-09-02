# detection logic 
from datetime import datetime
from database import SessionLocal
from models import Log
import random

session = SessionLocal()

alert_types = [
    {"source": "SSH", "message": "Brute-force detected from 192.168.1.10", "level": "ALERT"},
    {"source": "Firewall", "message": "Malware signature detected on host 192.168.1.20", "level": "ALERT"},
    {"source": "Web", "message": "Unauthorized access attempt to /admin", "level": "ALERT"},
    {"source": "System", "message": "User login successful", "level": "INFO"}
]

# Pick a random alert
alert = random.choice(alert_types)
new_log = Log(
    source=alert["source"],
    message=alert["message"],
    level=alert["level"],
    timestamp=datetime.now()
)

session.add(new_log)
session.commit()
print(f"{alert['level']} inserted for {alert['source']}")
session.close()
