## ReciPy Server Code - Documentation

These python files are the implementation of the opperations defined at the endpoints of the webapp.
To run the server locally you will need to run the flask_app.py file. If you have all dependencies as
listed in requirements.txt it should run. Open the link it provides you with to test server... follow structure of
code for enpoints

Examples:

@app.route('/')
def index():
   return render_template('testApp.html')

The above portion should render testApp.html in the 'templates' folder
any html file you wish to render must be placed in /templates. The Route '/'
is the defualt index of running page. This should be index.

@app.route('/search/<string:query>')
def search(query):
  #CODE

The above portion should run the search function defined under the app.route()
The url "http://127.0.0.1:5000/search/onion" should run search with the parameter 'onion'
This is the structure for sending parameters to the server functions.

Many guides reccomend running this in Virtual Environments. This is described as follows:
### Makes new virutal environment named "myproject"  
python -m venv myproject

Selecting Python interpeter path -> From Command Palette

### Must Run this command in admin to use flask on windows
venv\scripts\activate 
'testApp.html' source bin/activate

### Run on ubuntu for safety reasons: 
source venv/Scripts/activate

python3 flask.py

## Resources/ Refrences:
https://reactjs.org/docs/add-react-to-a-website.html
https://www.digitalocean.com/community/tutorials/how-to-make-a-web-application-using-flask-in-python-3
https://nordicapis.com/how-to-create-an-api-using-the-flask-framework/


