from sqlite3 import Time
from flask import Flask,render_template,jsonify
import time
import recipy
import os

app = Flask(__name__)

# Function Refrence for os commands.
"""
Code attempts to follow javadoc style
This is a javadoc style.

@param param1: this is a first param
@param param2: this is a second param
@return: this is a description of what is returned
@raise keyError: raises an exception
"""

"""
list_files(Directory, print_query='yes',ending="_results.csv")
@param Directory: Directory where we are seeking files
@param print_query: query that is 'yes' print files we find
@param ending: returns file ending we are looking for
@return: Returns list of all files in Directory with given ending
"""
def list_files(Directory, print_query='yes',ending="_results.csv"):
    usable_files = list()
    for file in os.listdir(Directory):
        if file.endswith(ending):
            if(print_query=='yes'):
                print(os.path.join(Directory, file))
            usable_files.append(file)
    return usable_files

"""
index(): renders defualt page
"""
@app.route('/')
def index():
   return render_template('testApp.html')

"""
search(query): preforms webscraping search on recipy database
@param: search query to be used
@return: json of search results
"""
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

"""
search2(query): preforms webscraping search on recipy database and exports search data
@param: search query to be used
@return: json of search results
"""
@app.route('/search_export/<string:user>/<string:query>')
def search2(user,query):
   print("Query:")
   print(query)
   #Timing
   start_time = time.time()

   results =recipy.query_sites(query)
   
   end_time = time.time()
   print("Time taken to retrieve:")
   print(end_time-start_time)
   return jsonify(results)


"""
user_search(query): preforms webscraping search on recipy database and exports search data to user history.
                    logs query under past_searches
@param: search query to be used
@return: json of search results
"""
@app.route('/user_search/<string:query>')
def user_search(query):
   return
"""
search2(query): preforms webscraping search on recipy database and exports search data
@param: search query to be used
@return: json of search results
"""
@app.route('/showdata/<string:user>')
def show_recipe_database(user):

   # Timing Start
   start_time = time.time()

   results =recipy.show_userdata(user) # Will show user files structure to be later described

   # NOTE: Add server file structure where containing the following
   # File structure: /user_data/userName/
   #                                    /password              : password to authenticatate entryy
   #                                    /past_searches         : past search queries
   #                                    /liked_recipes.csv     : recipe data that has been liked by user
   #                                    /pantry.csv             : List of items contained in pantry
   # Each user will have the above allowing it to be conviently refrenced on some login protocol 
   
   # Timing End
   end_time = time.time()

   print("Time taken to retrieve:")
   print(end_time-start_time)

   return jsonify(results)

if __name__ == '__main__':
   app.run()

