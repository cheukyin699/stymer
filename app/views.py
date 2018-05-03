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

@app.route('/<id>/watch')
def watch_share(id):
    '''
    TODO: Renders a read-only timer
    '''
    return render_template('index.html')
