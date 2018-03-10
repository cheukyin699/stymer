'''
Contains all the routes
'''
from flask import render_template
from app import app

@app.route('/')
@app.route('/index.html')
def index():
    '''
    Renders index page
    '''
    return render_template('index.html')
