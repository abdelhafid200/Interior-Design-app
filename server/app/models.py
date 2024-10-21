from .extensions import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'  # Nom de la table

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(150), nullable=False)
    last_name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<User {self.first_name} {self.last_name}>'  # Correction ici

class UserPreferences(db.Model):
    __tablename__ = 'user_preferences'  # Ajoutez un nom de table si nécessaire
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Correction ici
    style = db.Column(db.String(50))
    colors = db.Column(db.String(255))
    disliked_colors = db.Column(db.String(255))
    furniture = db.Column(db.String(255))
    size = db.Column(db.String(50))
    layout = db.Column(db.String(50))
    budget = db.Column(db.Float)
    additional_notes = db.Column(db.Text)

    user = db.relationship('User', backref='preferences')  # Correction ici

    def __repr__(self):
        return f'<UserPreferences {self.id}>'
