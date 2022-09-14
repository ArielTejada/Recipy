from flask import Flask,render_template,jsonify
import recipy_testing
app = Flask(__name__)

@app.route('/')
def index():
   return render_template('testApp.html')

@app.route('/search/<string:query>')
async def search(query):
   print(query)
   results =recipy_testing.query_sites_dict(query)
   return jsonify(results)
if __name__ == '__main__':
   app.run()