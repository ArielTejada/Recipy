from distutils.command.build import build
import time
import urllib
import os
import pandas as pd
from requests_html import HTML
from requests_html import HTMLSession
from requests_html import AsyncHTMLSession
import bcrypt

#https://practicaldatascience.co.uk/data-science/how-to-scrape-google-search-results-using-python
#https://requests.readthedocs.io/projects/requests-html/en/latest/

"""
Code attempts to follow javadoc style
This is a javadoc style.

@param param1: this is a first param
@param param2: this is a second param
@return: this is a description of what is returned
@raise keyError: raises an exception
"""


"""
build_link(): Builds link of given type's search
@param ingredients_list: list of ingredients you want included in recipe
@param type: recipe website type. Each website needs personal treatment
@return: link
"""
def build_link(ingredients_list,type="allrecipes",):
    link=""
    if(type=="allrecipes"):
        #allrecipes = 'https://www.allrecipes.com/search/results/?'
        #Example Link: https://www.allrecipes.com/search/results/?IngIncl=onion&IngIncl=garlic
        #
        #  Structure of Search
        # "https://www.allrecipes.com/search/results/?" + "IngIncl=" + query "&" + "IngIncl=" + query2 "&" + 
        #
        #   Builds link by adding each ingredient to include
        link +='https://www.allrecipes.com/search/results/?'
        for i in range(len(ingredients_list)):
            ingredients_list[i] = "IngIncl=" + ingredients_list[i]
            if i<len(ingredients_list)-1:
                ingredients_list[i]+="&"
            link+=ingredients_list[i]
    elif(type=="simplyrecipes"):
        #Simplyrecipes = 'https://www.simplyrecipes.com/search?q=?'
        #Example Link: https://www.simplyrecipes.com/search?q=onion
        #
        #  Structure of Search
        # "https://www.simplyrecipes.com/search?q=" + query 
        #
        #  Builds link by adding each ingredient to search
        link +='https://www.simplyrecipes.com/search?q='
        for i in range(len(ingredients_list)):
            #ingredients_list[i] = "IngIncl=" + ingredients_list[i]
            if i<len(ingredients_list)-1:
                ingredients_list[i]+=","
            link+=ingredients_list[i]
    return link


def parse_sites():
    session = HTMLSession()
    print("Recipes should include what? Separate each ingredient with commas")
    ingredients = input()
    ingredients = ingredients.split(sep=",")

    #Links for Base search
    #Include ingredients exploitation

    #allrecipes = 'https://www.allrecipes.com/search/results/?'
    #Example Link: https://www.allrecipes.com/search/results/?IngIncl=onion&IngIncl=garlic
    #
    #  Structure of Search
    # "https://www.allrecipes.com/search/results/?" + "IngIncl=" + query "&" + "IngIncl=" + query2 "&" + 
    #
    allrecipes_searchLink = build_link(ingredients,type="allrecipes",)
    print(allrecipes_searchLink)
    #Inlude ingredients exploitation


    #test = session.get('https://www.allrecipes.com/search/results/?IngIncl=onion')

    #print(test.html.links) 
    #prints all the links on a webpage

    test = session.get(allrecipes_searchLink)

    recipe_titles =test.html.find('.card__title') # List of recipe short titles
    recipe_descriptions =test.html.find('.card__summary') # List of recipe short decriptions
    recipe_link =test.html.find('.card__titleLink') # List of recipe links


    #Tests list from allrecipe.com

    for i in range(len(recipe_titles)):
        start_time= time.time()
        print("RECIPE TITLE")
        print(recipe_titles[i].text)
        print("RECIPE DESCRIPTION")
        print(recipe_descriptions[i].text)
        print("RECIPE LINK")
        print(str(recipe_link[i].links)[2:-2])
        print("INGREDIENTS")
        
        #Enters a the website page that stores the websites
        sub_test=session.get(str(recipe_link[i].links)[2:-2]) 
        
        #Uses selector to parse out each ingredient with ".ingredients-item" class 
        ingredients = sub_test.html.find(".ingredients-item")
        for i in range(len(ingredients)):
            #ingredients stores all information
            ingredients[i]=ingredients[i].text
        print(ingredients)
        finish_time = time.time()
        #selector val: .checklist dropdownwrapper
        directions = sub_test.html.find(".ingredients-item")
        for i in range(len(directions)):
            #direction stores all information
            directions[i]=directions[i].text
        print(directions)
        print("Took:"+str((finish_time-start_time))+" seconds")

"""
query_sites(): Builds link of given type's search
@param query: List of comma sererated recipes
@return: dictionary of results for search resultes
"""
def query_sites(query):
    session = HTMLSession()
    #print("Recipes should include what? Separate each ingredient with commas")
    ingredients = query
    ingredients = ingredients.split(sep=",")

    #Links for Base search
    #Include ingredients exploitation

    #allrecipes = 'https://www.allrecipes.com/search/results/?'
    #Example Link: https://www.allrecipes.com/search/results/?IngIncl=onion&IngIncl=garlic
    #
    #  Structure of Search
    # "https://www.allrecipes.com/search/results/?" + "IngIncl=" + query "&" + "IngIncl=" + query2 "&" + 
    #
    
    # AllRecipe.com Exploitation 

    allrecipes_searchLink = build_link(ingredients,type="allrecipes",)
    print(allrecipes_searchLink)
    #Inlude ingredients exploitation


    #test = session.get('https://www.allrecipes.com/search/results/?IngIncl=onion')

    #print(test.html.links) 
    #prints all the links on a webpage

    test = session.get(allrecipes_searchLink)

    #recipe with lowercase is html element. 
    #Recipe with uppercase is data value.
    #  

    recipe_titles =test.html.find('.card__title') # List of recipe short titles
    recipe_descriptions =test.html.find('.card__summary') # List of recipe short decriptions
    recipe_link =test.html.find('.card__titleLink') # List of recipe links

    Recipe_TITLES = list()
    Recipe_DESCRIPTION = list()
    Recipe_LINK = list()
    Recipe_INGREDIENTS= list()
    Recipe_DIRECTIONS= list()
    #Tests list from allrecipe.com

    for i in range(len(recipe_titles)):
        start_time= time.time()
        #print("RECIPE TITLE")
        Recipe_TITLES.append(recipe_titles[i].text)
        #print("RECIPE DESCRIPTION")
        Recipe_DESCRIPTION.append(recipe_descriptions[i].text)
        #print("RECIPE LINK")
        Recipe_LINK.append(str(recipe_link[i].links)[2:-2])
        #print("INGREDIENTS")
        
        #Enters a the website page that stores the websites
        sub_test=session.get(str(recipe_link[i].links)[2:-2]) 
        
        #Uses selector to parse out each ingredient with ".ingredients-item" class 
        ingredients = sub_test.html.find(".ingredients-item")
        for i in range(len(ingredients)):
            #ingredients stores all information
            ingredients[i]=ingredients[i].text
        Recipe_INGREDIENTS.append(ingredients)

        """ Uncomment Finish and  Start to track time"""
        #finish_time = time.time()
        #selector val: .paragraph
        directions = sub_test.html.find(".paragraph")
        for i in range(len(directions)):
            #direction stores all information
            directions[i]=directions[i].text
        Recipe_DIRECTIONS.append(directions)
        #print("Took:"+str((finish_time-start_time))+" seconds")

    #Simplyrecipes = 'https://www.simplyrecipes.com/search?q=?'
    #Example Link: https://www.simplyrecipes.com/search?q=onion
    #
    #  Structure of Search
    # "https://www.simplyrecipes.com/search?q=" + query 
    #
    
    # Simplyrecipes.com Exploitation [INSERT UNDERHERE]

    RECIPE_data = {}
    RECIPE_data["TITLES"] =Recipe_TITLES      
    RECIPE_data["DESCRIPTION"] =Recipe_DESCRIPTION 
    RECIPE_data["LINK"] =Recipe_LINK 
    RECIPE_data["INGREDIENTS"] =Recipe_INGREDIENTS 
    RECIPE_data["DIRECTIONS"] =Recipe_DIRECTIONS 

    RECIPE_data = pd.DataFrame(RECIPE_data)
    csv_Title=query+ str("_results") 
    RECIPE_data.to_csv(csv_Title)

"""
query_sites(): Builds link of given type's search
@param query: List of comma sererated recipes
@return: dictionary of results for search resultes; *Will be used for actual implementation*
"""    
def query_sites_dict(query):
    session = HTMLSession()
    print("Recipes should include what? Separate each ingredient with commas")
    ingredients = query
    ingredients = ingredients.split(sep=",")

    #Links for Base search
    #Include ingredients exploitation

    #allrecipes = 'https://www.allrecipes.com/search/results/?'
    #Example Link: https://www.allrecipes.com/search/results/?IngIncl=onion&IngIncl=garlic
    #
    #  Structure of Search
    # "https://www.allrecipes.com/search/results/?" + "IngIncl=" + query "&" + "IngIncl=" + query2 "&" + 
    #
    allrecipes_searchLink = build_link(ingredients,type="allrecipes",)
    print(allrecipes_searchLink)
    #Inlude ingredients exploitation


    #test = session.get('https://www.allrecipes.com/search/results/?IngIncl=onion')

    #print(test.html.links) 
    #prints all the links on a webpage

    test = session.get(allrecipes_searchLink)

    #recipe with lowercase is html element. 
    #Recipe with uppercase is data value.
    #  

    recipe_titles =test.html.find('.card__title') # List of recipe short titles
    recipe_descriptions =test.html.find('.card__summary') # List of recipe short decriptions
    recipe_link =test.html.find('.card__titleLink') # List of recipe links

    Recipe_TITLES = list()
    Recipe_DESCRIPTION = list()
    Recipe_LINK = list()
    Recipe_INGREDIENTS= list()
    Recipe_DIRECTIONS= list()
    #Tests list from allrecipe.com

    for i in range(len(recipe_titles)):
        start_time= time.time()
        #print("RECIPE TITLE")
        Recipe_TITLES.append(recipe_titles[i].text)
        #print("RECIPE DESCRIPTION")
        Recipe_DESCRIPTION.append(recipe_descriptions[i].text)
        #print("RECIPE LINK")
        Recipe_LINK.append(str(recipe_link[i].links)[2:-2])
        #print("INGREDIENTS")
        
        #Enters a the website page that stores the websites
        sub_test=session.get(str(recipe_link[i].links)[2:-2]) 
        
        #Uses selector to parse out each ingredient with ".ingredients-item" class 
        ingredients = sub_test.html.find(".ingredients-item")
        for i in range(len(ingredients)):
            #ingredients stores all information
            ingredients[i]=ingredients[i].text
        Recipe_INGREDIENTS.append(ingredients)
        finish_time = time.time()
        #selector val: ".paragraph
        directions = sub_test.html.find(".paragraph")
        for i in range(len(directions)):
            #direction stores all information
            directions[i]=directions[i].text
        Recipe_DIRECTIONS.append(directions)
        print("Took:"+str((finish_time-start_time))+" seconds")

    RECIPE_data = {}
    RECIPE_data["TITLES"] =Recipe_TITLES      
    RECIPE_data["DESCRIPTION"] =Recipe_DESCRIPTION 
    RECIPE_data["LINK"] =Recipe_LINK 
    RECIPE_data["INGREDIENTS"] =Recipe_INGREDIENTS 
    RECIPE_data["DIRECTIONS"] =Recipe_DIRECTIONS 
    """
    # Don't Make into csv... we only want dictionary
    RECIPE_data = pd.DataFrame(RECIPE_data)
    csv_Title=query+ str("_results") 
    RECIPE_data.to_csv(csv_Title)"""
    return RECIPE_data

"""
User Management Functions:

These functions are called to manipulate userdata subfolders

"""
# NOTE: File structure for user data
#                 /user_data/userName/
#                                    /password              : password to authenticatate entryy
#                                    /past_searches         : past search queries
#                                    /liked_recipes.csv     : recipe data that has been liked by user
#                                    /pantry.csv             : List of items contained in pantry
# Each user will have the above allowing it to be conviently refrenced on some login protocol 

# Functions for ensuring that the userdata folder is always a folder

def userdata_exists():
    current_directory = os.getcwd()
    current_directory = os.path.join(current_directory,'server')
    current_directory = os.path.join(current_directory,'user_data')
    if(os.path.exists(current_directory)):
        # Directory exists
        return True
    else:
        return False

def build_userdata():
    current_directory = os.getcwd() # NOTE: Directory Begins in root of github files
    path=os.path.join(current_directory,build_user_path(""))
    os.mkdir(path)
    USERDATA_SUBFOLDERS = ['users.csv','past_searches.csv','liked_recipes.csv','pantry.csv']
    for sub in USERDATA_SUBFOLDERS:
        new_file = open(os.path.join(path,sub),'a')
        if sub == 'users.csv':
            new_file = open(os.path.join(path,sub),'a')
            df=initialize_user_data(2)
            df.to_csv('users.csv')
            #new_file.write(password)
        new_file.close()
    


"""
DEPRECIATED

build_user(user,password): Creates files in user subdirectory associated with it
@param user: username associated with user
@param password: password associated with user

def build_user(user,password):
    current_directory = os.getcwd() # NOTE: Directory Begins in root of github files
    path=os.path.join(current_directory,build_user_path(user))
    print(os.getcwd())
    print(os.listdir(os.getcwd()))
    os.mkdir(path) 
    # Make change to this to add to a central data base
    USER_SUBFOLDERS = ['password','past_searches.csv','liked_recipes.csv','pantry.csv']
    for sub in USER_SUBFOLDERS:
        new_file = open(os.path.join(path,sub),'a')
        if sub == 'password':
            new_file = open(os.path.join(path,sub),'a')
            new_file.write(password)
        new_file.close()
""" 
"""
DEPRECIATED

build_user(user,password): Creates files in user subdirectory associated with it
@param user: username associated with user
@param password: password associated with user

def build_user(user,password):
    current_directory = os.getcwd() # NOTE: Directory Begins in root of github files
    path=os.path.join(current_directory,build_user_path(user))
    print(os.getcwd())
    print(os.listdir(os.getcwd()))
    os.mkdir(path) 
    # Make change to this to add to a central data base
    USER_SUBFOLDERS = ['password','past_searches.csv','liked_recipes.csv','pantry.csv']
    for sub in USER_SUBFOLDERS:
        new_file = open(os.path.join(path,sub),'a')
        if sub == 'password':
            new_file = open(os.path.join(path,sub),'a')
            new_file.write(password)
        new_file.close()
"""

def encrypt_password(password):
    # https://www.geeksforgeeks.org/hashing-passwords-in-python-with-bcrypt/
    password = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password,salt)
    hashed= hashed.decode('utf-8')
    return hashed

def add_user(user,password):
    current_directory = os.getcwd() # NOTE: Directory Begins in root of github files
    path=os.path.join(current_directory,build_user_path(user))
    path =os.path.join(path,'users.csv')

    if(os.path.exists(path)) and os.path.getsize(path)>0:
        user_df=pd.read_csv(path)
    else:
        user_df=initialize_user_data(2)

    password = encrypt_password(password)

    #user_df.loc[len(user_df.index)] = [user,password]
    newENTRY={'username':[user],"password":[password]}
    newENTRY=pd.DataFrame(newENTRY)
    print("PRE-UPDATE")
    print(newENTRY)
    user_df=pd.concat([user_df,newENTRY], axis = 0)
    print("POST-UPDATE")
    user_df=user_df.drop(['Unnamed: 0'], axis=1)
    user_df=user_df.reset_index(drop=True)
    print(user_df)
    user_df.to_csv(path)
    return user_df

def get_password(user):
    path =build_user_path(user)
    path =os.path.join(path,'users.csv')
    user_df =pd.read_csv(path)
    user_df = user_df.loc[user_df['username']==user]
    #https://stackoverflow.com/questions/16729574/how-can-i-get-a-value-from-a-cell-of-a-dataframe
    password =user_df.iloc[0]['password'] # Should work?
    return password

def login(user,password):
    # https://gist.github.com/amelieykw/20a64653d7f05f5575876bc0af59e0f1
    password = password.encode('utf-8')
    hashed_password = get_password(user).encode('utf-8')
    check = bcrypt.checkpw(password,hashed_password)# https://stackoverflow.com/questions/34548846/flask-bcrypt-valueerror-invalid-salt
    print("login ")
    return check

"""
build_user_path (): Builds path to userdata directory. 
As a result of shift to central user database this function needs no parameters
@param user: username associated with user. DOES NOTHING... SHOULD BE REMOVED
@return Path of user in specified directory.
"""   
def build_user_path(user, DIRECTORY ="user_data"):
    cwd = os.getcwd()
    if 'server' in os.listdir(cwd):
        cwd =os.path.join(cwd,'server')
    path =os.path.join(cwd,DIRECTORY)
    return path
""" 
access_userdata(user): Attempts to acess a user's directory in their file.
@param user: username associated with user
@return True if user is accessed
        False if user doesn't exist
 """
def access_userdata(user):
    path =build_user_path(user)
    # User Authentication
    # If a user exists in userdata base
    
    path =os.path.join(path,'users.csv')
    
    # Check if userdata has been created yet.
    if os.path.getsize(path)>0:
        user_df =pd.read_csv(path)
    else:
        return False
    if(user_df.loc[user_df['username']==user].size>0):      
        return True
    else:
        #print(file+" doesn't exist.")
        #os.mkdir(path)
        return False
"""
DEPRECIATED

access_userdata(user): Attempts to acess a user's directory in their file.
@param user: username associated with user
@return True if user is accessed
        False if user doesn't exist
  
def access_userdata(user):
    path =build_user_path(user)
    # User Authentication
    # If a user exists in userdata base

    if(os.path.exists(path)):
        print("Welcome "+user)            
        return True
    else:
        #print(file+" doesn't exist.")
        #os.mkdir(path)
        return False
""" 
"""
get_userdata(user): Shows userdata. Will return None if user directory doesn't exist
@param user: username associated with user
@return User Directory Files to be interperted by server
        Will return None if user directory doesn't exist
""" 
def get_userdata(user):
    if(access_userdata(user)):
        path =build_user_path(user)
        user_data = os.listdir(path)
        return user_data
"""
initialize_user_data(index): Initializes the data associated with a file in userdata
@param index: username associated with user
@return User Directory Files to be interperted by server
        Will return None if user directory doesn't exist
""" 
def initialize_user_data(index):
    # Initalizes user data based on catagory of data
    # 0 - liked_recipes.csv
    # 1 - pantry.csv
    # 2 - password
    # 3 - past_searches.csv
    if index==0:
        data = {
            'TITLES' : [],
            'DESCRIPTION' : [],
            'LINK' : [],
            'INGREDIENTS' : [],
            'DIRECTIONS' : []
        }
        data = pd.DataFrame(data)
        data.to_csv('liked_recipes.csv')
    elif index==1:
        # Saves pantry as name of ingredients
        data = {
            'name' : [],
            'expiration_date': []
        }
        data = pd.DataFrame(data)
        data.to_csv('pantry.csv')
    elif index==2:
        # Saves pantry as name of ingredients
        data = {
            'username' : [],
            'password': []
        }
        data = pd.DataFrame(data)
        data.to_csv('users.csv')
    elif index==3:
        data = {
            'name' : [],
        }
        data = pd.DataFrame(data)
        data.to_csv('past_searches.csv')
    return data

def get_userdata(user,index):
    # Gets user data index
    # 0 - liked_recipes.csv
    # 1 - pantry.csv
    # 2 - users.csv
    # 3 - past_searches.csv

    CENTRAL_FILES = ["liked_recipes.csv","pantry.csv","users.csv","past_searches.csv"]
    file = CENTRAL_FILES[index]
    data = os.path.join(build_user_path(user),file)

    if os.path.getsize(data)>0:
        data = pd.read_csv(data)
        return data
    data = initialize_user_data(index)
    return data

def add_to_liked_recipes(user,recipe_name):
     # Implement this function that looks up a recipe in the recipe database and adds it to the user's 'liked_recipes.csv
     # 
     # Looks up recipe_name in recipe database with .loc and adds it to "liked_recipes.csv"
     #
     # returns nothing.
     return

        