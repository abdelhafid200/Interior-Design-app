from flask import Flask
from .config import Config
from .extensions import db, migrate, ma, jwt
from .routes import auth

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialiser les extensions
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    jwt.init_app(app)
    
    # Enregistrer les Blueprints
    app.register_blueprint(auth.bp, url_prefix='/auth')
    
    return app
