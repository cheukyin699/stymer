'''
App initializations
'''
from flask import Flask
from flask_assets import Environment, Bundle

app = Flask(__name__)

def generate_assets():
    '''
    Generates minified assets for the site. Returns the environment that the
    assets live in.
    '''
    assets = Environment(app)
    base_css = Bundle('base.css', filters='cssutils', output='gen/base.css')
    base_js = Bundle('base.js', filters='jsmin', output='gen/base.js')

    assets.auto_build = True

    assets.register('base_css', base_css)
    assets.register('base_js', base_js)

    # Build all assets
    for bundle in assets:
        bundle.build()

    return assets

assets = generate_assets()

from . import views
