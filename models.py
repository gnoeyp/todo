from sqlalchemy import MetaData
from sqlalchemy import Table, Column, Integer, String, Boolean, Text, Date
from sqlalchemy import ForeignKey
from sqlalchemy import create_engine
import datetime

metadata = MetaData()

user_table = Table(
    'user',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('username', String(30), unique=True, nullable=False),
    Column('password', String(30), nullable=False)
)

todo_table = Table(
    'todo',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('user_id', ForeignKey('user.id'), nullable=False),
    Column('content', Text, nullable=False),
    Column('date', Date, nullable=False),
    Column('done', Boolean, nullable=False)
)

