# log model 
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base

# Log table model
class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    source = Column(String, nullable=False)        # e.g. firewall, IDS, server
    message = Column(String, nullable=False)       # log details
    level = Column(String, nullable=False)         # INFO, WARNING, ERROR
    timestamp = Column(DateTime, default=datetime.utcnow)
