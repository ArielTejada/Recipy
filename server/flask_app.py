from flask import Flask,render_template,jsonify
import recipy
app = Flask(__name__)

@app.route('/')
def index():
   return render_template('testApp.html')

@app.route('/search/<string:query>')
def search(query):
   print(query)
   results =recipy.query_sites_dict(query)
   return jsonify(results)
if __name__ == '__main__':
   app.run()