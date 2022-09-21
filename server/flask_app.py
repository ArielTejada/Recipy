from sqlite3 import Time
from flask import Flask,render_template,jsonify
import time
import recipy
import os

app = Flask(__name__)

def list_files(Directory, print_query='yes',ending="_results.csv"):
    usable_files = list()
    for file in os.listdir(Directory):
        if file.endswith(ending):
            if(print_query=='yes'):
                print(os.path.join(Directory, file))
            usable_files.append(file)
    return usable_files


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
   #Save Data Under results for user
   return jsonify(results)

@app.route('/search_and_export/<string:query>')
def search2(query):
   print("Query:")
   print(query)
   #Timing
   start_time = time.time()
   results =recipy.query_sites(query)
   end_time = time.time()
   print("Time taken to retrieve:")
   print(end_time-start_time)
   return jsonify(results)

@app.route('/showdata/<string:query>')
def show_recipe_database(user):
   print("Acessing User")
   print(user)
   directory ="user_data"
   file =user
   path =os.path.join(directory,file)
   
   # User Authentication

   if(os.path.exists(path)):
      print(file+" doesn't exist. Welcome new user")
      os.mkdir(path)
   else:
      print("Welcome "+user)

   # Timing
   start_time = time.time()

   results =recipy.show_userdata(user) # Unimplemented -> will show user files structure to be later described
   end_time = time.time()
   print("Time taken to retrieve:")
   print(end_time-start_time)

   # NOTE: Add ser file structure where containing the following
   # File structure: /user_data/userName/
   #                                    /password              : password to authenticatate entryy
   #                                    /past_searches         : past search queries
   #                                    /liked_recipes.csv     : recipe data that has been liked by user
   #                                    /panty.csv             : List of items contained in pantry
   # Each user will have the above allowing it to be conviently refrenced on some login protocol 
   return jsonify(results)    
if __name__ == '__main__':
   app.run()

@app.route('/search_and_export/<string:query>')
def search2(query):
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