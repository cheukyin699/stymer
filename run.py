'''
Script for running the server
'''
import os
from app import app

app.jinja_env.auto_reload = True
app.run(host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', '8080')),
        debug=True)
