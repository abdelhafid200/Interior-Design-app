from flask_marshmallow import Marshmallow
from marshmallow import fields, validate

ma = Marshmallow()

class UserSchema(ma.Schema):
    id = fields.Int(dump_only=True)
    # username = fields.Str(required=True, validate=validate.Length(min=4, max=150))
    first_name = fields.Str(required=True, validate=validate.Length(min=4, max=150))
    last_name = fields.Str(required=True, validate=validate.Length(min=4, max=150))
    email = fields.Email(required=True)
    password = fields.Str(load_only=True, required=True, validate=validate.Length(min=6))
    created_at = fields.DateTime(dump_only=True)
