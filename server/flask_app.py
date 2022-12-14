from distutils.log import error
from sqlite3 import Time
from flask import Flask,render_template,jsonify
import time
import recipy
import database_testing
import os
import pandas as pd
import json


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
index(): renders default page. Will not be used. 
"""
@app.route('/')
def index():
   return render_template('testApp.html')

############################## 
#      Basic Functions       # 
##############################
#
# Functions not based on user 
# data
#
# # # # # # # # # # # # # # # 
"""
search(query): preforms webscraping search saving nothing
@param query: search query to be used
@return: json of search results
"""
@app.route('/search/<string:query>')
def search(query):
   data = database_testing.query_recipe_data(query)
   return jsonify(data.to_dict())
   """print("Query:")
   #Timing
   start_time = time.time()
   print(query)
   if(query.find(',')):
      query=query.split(',')
      results=pd.DataFrame(recipy.query_sites_dict(query[0]))
      for q in range(len(query)):
         if q>=1:
            results=recipy.query_sites_dict(query[q])
     


   else:
      results =recipy.query_sites_dict(query)

   end_time = time.time()
   print("Time taken to retrieve:")
   print(end_time-start_time)
   #Save Data Under results for user
   return jsonify(results)"""    



##################################################### 
#    User Based Functions - Server Side Functions   # 
#####################################################
#
#  Functions here rely on user data for their 
#  functionalities.
#

"""
search2(query): preforms webscraping search on recipy database and exports search data. Saves query under a users past search a data
@param user: user to save data under
@param query: search query to be used
@return: json of search results
"""
@app.route('/search_export/<string:user>/<string:query>')
def search2(user,query):


   data = database_testing.query_recipe_data(query)

   #Adds to user search history by updating past_searches
   return jsonify(data.to_dict())

   #Adds to user search history by updating past_searches
   print(recipy.get_userdata(user,3)) 

   

   results =recipy.query_sites(query)
   #Timing
   end_time = time.time()
   print("Time taken to retrieve:")
   print(end_time-start_time)
   return jsonify(results)


"""
load_ingredients(): Gets ingredients from database
@return: json of search results
"""
@app.route('/load_ingredients')
def load_ingredients():
   # Timing Start
   start_time = time.time()
   path=os.getcwd()
   path=os.path.join(path,'datasets')
   path=os.path.join(path,'ingredient_data2.json')
   path=open(path)
   #ingredients= pd.read_csv(path,encoding='latin-1')
   ingredients= json.load(path)
   # Timing End
   end_time = time.time()
   print("Time taken to retrieve:")
   print(end_time-start_time)
   return jsonify(ingredients)
"""
signup(user,password): Signs up new user and password
@param user: username
@param password: password
@return: json of login results
{
   message: user + str(" has successfully logged in.";
   'loggedIN?': bool;
}
"""
@app.route('/signup/<string:user>/<string:password>')
def signup(user,password):
   if not recipy.userdata_exists():
      recipy.build_userdata()
   if not recipy.access_userdata(user): # Check if user exists indata base
      recipy.add_user(user,password)
   return login(user,password)
"""
login(user,password): Signs up new user and password
@param user: username
@param password: password
@return: json of login results
{
   message: user + str(" has successfully logged in.";
   'loggedIN?': bool;
}

"""
@app.route('/login/<string:user>/<string:password>')
def login(user,password):
   if recipy.access_userdata(user):
      if recipy.login(user,password):
         # CASE 1: Sucessful Login
         message_CONTENT = user + str(" has successfully logged in.")
         message ={}
         message['message'] = message_CONTENT
         message['loggedIN?'] =True
         message =  jsonify(message) # Return login message
         return message
      else:
         # CASE 2: INCORRECT PASSWORD
         message_CONTENT = str(" Incorrect Password")
         message ={}
         message['message'] = message_CONTENT
         message['loggedIN?'] =False
         message =  jsonify(message) # Return login message
         return message
   # CASE 3: User does not exist
   message_CONTENT = user + str(" does not exist")
   message ={}
   message['message'] = message_CONTENT
   message['loggedIN?'] =False
    # Return login message
   return jsonify(message)
   

"""
favorite(user): Gets users favorited recipes
@param user: search query to be used
@return: json of favorite results
@return: json of login results
{
   message: recipe_name + str(" has been successfully favorited.");
}
"""
@app.route('/favorite/<string:user>/<string:recipe_name>')
def favorite(user,recipe_name):
   # Timing Start
   start_time = time.time()
   print(recipe_name)
   recipy.add_to_liked_recipes(user,recipe_name)

   # Timing End
   end_time = time.time()
   print("Time taken to retrieve:")
   print(end_time-start_time)
   message_CONTENT = recipe_name + str(" has been successfully favorited.")
   message ={}
   message['message'] = message_CONTENT
   message =  jsonify(message) # Return favorite message
   return message

"""
show_favorite_history(user): Gets users favorited recipes
@param user: username
@return: json of search results
"""
@app.route('/showdata/<string:user>')
def show_favorite_history(user):

   # Timing Start
   start_time = time.time()
   # Always check if user can be acessed as there is no distinction between None being returned as a
   # result of their being no history for a user and None being returned a result of the user not existing.
   
   if(recipy.access_userdata(user)): 
      results =recipy.get_userdata(user,0) 
      return jsonify(results.to_dict())# Will return json of all recipes in users favorited.
      # NOTE:
      # Initalizes user data based on catagory of data
      # 0 - liked_recipes.csv
      # 1 - pantry.csv
      # 2 - password
      # 3 - past_searches.csv
   else:
      print(user)
      print("Does not exist")
      results= None 

   # Timing End
   end_time = time.time()
   print("Time taken to retrieve:")
   print(end_time-start_time)

   return jsonify(results)

"""
search(query): preforms webscraping search saving nothing
@param query: search query to be used
@return: json of search results

@app.route('/image/<string:query>')
def search(query):
   img= database_testing.scape_image(query)
   return jsonify(data.to_dict())
"""
if __name__ == '__main__':
   app.run()

