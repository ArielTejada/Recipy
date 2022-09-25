from distutils.log import error
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
search(query): preforms webscraping search saving nothing
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

User Management - Server Side Functions

"""

"""
add_new_user(user): Adds new user to user_data
@param: username 
@return: 
"""
@app.route('/signup/<string:user>')
def add_user(user):
   if(recipy.access_userdata(user)):
      print(user)
      print("is the name of another user. Please pick another username")
      error_message = user + str(" is the name of another user. Please pick another username")
      error =  jsonify({"message": error_message})
      return error
            
   else:
      recipy.build_user(user)

"""
search2(query): preforms webscraping search on recipy database and exports search data. Saves query under a users past search a data
@param: user to save data under
@param: search query to be used
@return: json of search results
"""
@app.route('/search_export/<string:user>/<string:query>')
def search2(user,query):
   print("Query:")
   print(query)
   
   #Timing
   start_time = time.time()

   #Adds to user search history by updating past_searches
   print(recipy.get_userdata(user)) 

   

   results =recipy.query_sites(query)
   #Timing
   end_time = time.time()
   print("Time taken to retrieve:")
   print(end_time-start_time)
   return jsonify(results)

"""

show_favorite_history(user): Gets users favorited recipes
@param: search query to be used
@return: json of search results
"""
@app.route('/showdata/<string:user>')
def show_favorite_history(user):

   # Timing Start
   start_time = time.time()
   # Always check if user can be acessed as there is no distinction between None being returned as a
   # result of their being no history for a user and None being returned a result of the user not existing.
   
   if(recipy.access_userdata(user)): 
      results =recipy.get_userdata(user) # Will get user files structure
      # NOTE:
      # File structure: /user_data/userName/
      #                                    /password              : password to authenticatate entryy
      #                                    /past_searches         : past search queries
      #                                    /liked_recipes.csv     : recipe data that has been liked by user
      #                                    /pantry.csv             : List of items contained in pantry
      # Each user will have the above allowing it to be conveniently refrenced here.
   else:
      print(user)
      print("Does not exist")
      results= None   
   # Timing End
   end_time = time.time()
   print("Time taken to retrieve:")
   print(end_time-start_time)

   return jsonify(results)

if __name__ == '__main__':
   app.run()

