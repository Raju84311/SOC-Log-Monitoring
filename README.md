# SOC Log Monitoring System
# Overview
The SOC Log Monitoring System is a real-time Security Operations Center (SOC) tool designed to monitor system, SSH, and firewall logs, detect security threats such as brute-force attacks and malware signatures, and display them in an easy-to-use web dashboard. It provides real-time alerts to help administrators respond to potential threats quickly.

 # Features
- Real-time monitoring of system, SSH, and firewall logs.
- Detection of brute-force login attempts and malware activity.
- Logs are stored in a local database for historical analysis.
- Web-based dashboard to view all alerts with filtering and search functionality.
- Alerts are categorized by severity level (INFO, ALERT).

 # Technologies Used
- Backend: Python, Flask, SQLAlchemy, SQLite
- Frontend: React.js, Axios, CSS
- Tools: Git, GitHub, Visual Studio Code

 # System Architecture
1. Log Detection Module (`detection.py`)  
   Monitors logs, detects anomalies (brute-force, malware), and inserts alerts into the SQLite database.

2. Database Module (`database.py` and `models.py`)  
   Uses SQLAlchemy ORM to create and manage the `logs` table.

3. Backend API (`app.py`)  
   Flask API exposes endpoints:
   - `/health` – health check
   - `/alerts` – fetch all alerts from the database

4. Frontend Dashboard (`React App`)  
   - Fetches alerts from Flask API
   - Displays alerts in a table with filter and search options
   - Shows real-time notifications for new alerts

# Setup Instructions
 # Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/Raju84311/SOC-Log-Monitoring.git
   cd soc-log-monitoring/backend

# Create and activate a virtual environment:
python -m venv venv
venv\Scripts\activate    # Windows
source venv/bin/activate # Linux/Mac

# Install dependencies:
pip install -r requirements.txt

# Create the database:
python create_db.py

# Run detection (to insert sample alerts):
python detection.py

# Start the backend server:
python app.py
Backend runs on http://127.0.0.1:5000.

# Frontend
Navigate to frontend folder:
cd ../dashboard

# Install dependencies:
npm install

# Start the React dashboard:
npm start
Dashboard runs on http://localhost:3000.

# Usage
•	Open the web dashboard in a browser.
•	View all alerts in the table.
•	Filter alerts by severity level or search by source/message.
•	New alerts are automatically shown at the top with notifications.

# Project Status
•	Fully functional SOC log monitoring system.
•	Database-driven alert storage.
•	Professional, responsive frontend dashboard.
•	Real-time alert notifications.

# Author
S B Narasimha Raju
Email: sbnarasimharaju@gmail.com

# License
This project is licensed under the MIT License.




