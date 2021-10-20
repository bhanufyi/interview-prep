from flask import Flask, render_template,jsonify,make_response
from flask_restful import Api, Resource
from flask_cors import CORS
import os
from details_soup import UserData, UsernameError, PlatformError
from send_mail import Mail

app = Flask(__name__)
CORS(app,origins="*")
api = Api(app)


class Details(Resource):
    def get(self, platform, username):

        user_data = UserData(username)

        try:
            data = user_data.get_details(platform)
            print(data)
            return data

        except UsernameError:
            return  make_response(jsonify({'status': 'Failed', 'details': 'Invalid username'}),404)

        except PlatformError:
            return make_response(jsonify({'status': 'Failed', 'details': 'Invalid platform'}),404)


api.add_resource(Details,'/api/<string:platform>/<string:username>')


@app.route('/')
def hello():
    return make_response(jsonify({"success":os.environ.get('VAR',"hello")}),200)


@app.errorhandler(404)
def invalid_route(e):
    return make_response(jsonify({"error":"route not found"}),404)


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=os.environ.get('PORT',80))