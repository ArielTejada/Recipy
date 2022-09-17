from sqlite3 import Time
from flask import Flask,render_template,jsonify
import time
import recipy
app = Flask(__name__)

@app.route('/')
def index():
   return render_template('testApp.html')

@app.route('/search/<string:query>')
def search(query):
   print("Query:")
   print(query)
   #Timing
   start_time = time.time()
   results =recipy.query_sites_dict(query)
   end_time = time.time()
   print("Time taken to retrieve:")
   print(end_time-start_time)
   return jsonify(results)

@app.route('/search_and_export/<string:query>')
def search(query):
   print("Query:")
   print(query)
   #Timing
   start_time = time.time()
   results =recipy.query_sites(query)
   end_time = time.time()
   print("Time taken to retrieve:")
   print(end_time-start_time)
   return jsonify(results)  
if __name__ == '__main__':
   app.run()