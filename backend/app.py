from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)
CORS(app)
#datebase
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///books.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

#swagger
@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

### swagger specific ###
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
swaggerblueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "PrzyjaznaBibliotekaProjekt"
    }
)
app.register_blueprint(swaggerblueprint, url_prefix=SWAGGER_URL)
### end swagger specific ###

frontend_folder = os.path.join(os.getcwd(),"..","frontend")
dist_folder = os.path.join(frontend_folder,"dist")

# Server static files from the "dist" folder under the "frontend" directory
@app.route("/",defaults={"filename":""})
@app.route("/<path:filename>")
def index(filename):
  if not filename:
    filename = "index.html"
  return send_from_directory(dist_folder,filename)


import routes
with app.app_context():
    db.create_all()


if __name__ == '__main__':
    app.run(debug=True)

