from flask import jsonify
import recipy
from requests_html import HTMLSession
import time
import os
import pandas as pd
import bcrypt
import json



# REMEMBER INSTALL DEPENDENCIES : pip install -r requirements.txt

# Use this file for testing calls of recipy functions.
# By running things here you are running the program entirely locally
# cd server
# Run with py recipy_testing.py

"""
Code attempts to follow javadoc style
This is a javadoc style.

@param param1: this is a first param
@param param2: this is a second param
@return: this is a description of what is returned
@raise keyError: raises an exception
"""

## Filter Testing ##
#  Filters out ingredients from ingredient portion
def filter_out_ingredients():
    return

## Filter Testing ##
#  Filters out ingredients from ingredient portion
def load_query():
    return


def build_link(ingredient,type="allrecipes",):
    link=""
    if(type=="allRecipes"):
        #allrecipes = 'https://www.allrecipes.com/search/results/?'
        #Example Link: https://www.allrecipes.com/search/results/?IngIncl=onion&IngIncl=garlic
        #
        #  Structure of Search
        # "https://www.allrecipes.com/search?" + "q=" + query
        #
        #   Builds link by adding each ingredient to include
        link +='https://www.allrecipes.com/search?'
        link += 'q='+str(ingredient)
        return link
    if(type=="simplyRecipes"):
        #allrecipes = 'https://www.allrecipes.com/search/results/?'
        #Example Link: https://www.allrecipes.com/search/results/?IngIncl=onion&IngIncl=garlic
        #
        #  Structure of Search
        # "https://www.allrecipes.com/search?" + "q=" + query
        #
        #   Builds link by adding each ingredient to include
        link +='https://www.simplyrecipes.com/search?'
        link += 'q='+str(ingredient)
        return link
    

def simplyRecipes(query):

    session = HTMLSession()
    #Simplyrecipes = 'https://www.simplyrecipes.com/search?q=?'
    #Example Link: https://www.simplyrecipes.com/search?q=onion
    #
    #  Structure of Search
    # "https://www.simplyrecipes.com/search?q=" + query 
    #
    
    # Simplyrecipes.com Exploitation [INSERT UNDERHERE]

    ingredients = query
    simplyRecipes_searchLink = build_link(ingredients,type="simplyRecipes")
    print(simplyRecipes_searchLink)
    

    #get html
    response=session.get(simplyRecipes_searchLink)
    search_results = response.html.links
    potential_recipe_pages = filter(lambda link: link.find("https://www.simplyrecipes.com/recipes/")>=0,search_results)
    #"Gallery Pages - Pages that may contain links to recipes" Most of our links will be this.


    potential_recipe_pages = list(potential_recipe_pages)
    print(potential_recipe_pages)

    # RE DO THis portion based on simply recipes

    # Pages that may contain standard Formatted recipe data. They are likely to but not guarenteed so we preform a search for the recipe's directions'.
    # If we find a recipe name then the rest of the data should be there
    recipes = []
    for page in potential_recipe_pages:
        potential_recipe=session.get(page)
        print(page)
        directions =potential_recipe.html.find(".recipe__steps")
        print(directions)
        if directions:
            recipes.append(page)
    print(recipes)
    
    #Preform Scrape on all recipes
    data = []
    for r in recipes:
        data.append(scrape(r,"allrecipes"))
    return pd.DataFrame(data)

def allRecipes(query):

    session = HTMLSession()
    #Simplyrecipes = 'https://www.allrecipes.com/search?q=?'
    #Example Link: https://www.allrecipes.com/search?q=onion
    #
    #  Structure of Search
    # "https://www.allrecipes.com/search?q=" + query 
    #
    
    # allrecipes.com.com Exploitation [INSERT UNDERHERE]

    ingredients = query
    allRecipes_searchLink = build_link(ingredients,type="allRecipes")
    print(allRecipes_searchLink)
    

    #get html
    response=session.get(allRecipes_searchLink)
    search_results = response.html.links
    potential_recipe_pages = filter(lambda link: link.find("https://www.allrecipes.com/recipe/")>=0,search_results)
    #"Gallery Pages - Pages that may contain links to recipes" Most of our links will be this.


    potential_recipe_pages = list(potential_recipe_pages)
    print(potential_recipe_pages)

    # Pages that may contain standard Formatted recipe data. They are likely to but not guarenteed so we preform a search for the recipe's directions'.
    # If we find a recipe name then the rest of the data should be there
    recipes = []
    for page in potential_recipe_pages:
        potential_recipe=session.get(page)
        print(page)
        directions =potential_recipe.html.find(".recipe__steps")
        print(directions)
        if directions:
            recipes.append(page)
    print(recipes)
    
    #Preform Scrape on all recipes
    data = []
    for r in recipes:
        data.append(scrape(r,"allrecipes"))
    
    # For pages 2-5
    
    allRecipes_searchLink_pages =increment_page(query,"allrecipes")
    return pd.DataFrame(data)

def increment_page(query,type):
    links =[]
    ingredients = query
    if(type=="allrecipes"):
        for i in range(2,6):
            offset = (i-1)*24
            link ='https://www.allrecipes.com/search?'
            link += str(ingredients)+'='+str(ingredients)+"&offset"+str(offset)+"&q="+ingredients
            links.append(link)
    elif(type=="simplyRecipes"):
        #https://www.simplyrecipes.com/search?q=tomato&offset=24
        for i in range(2,6):
            offset = (i-1)*24
            link ='https://www.simplyrecipes.com/search?'
            link += 'q='+str(ingredients)+"&offset"+str(offset)
            links.append(link)
    return links




def scrape(link,type):
    # Data Needed: ,TITLE,DESCRIPTION,LINK,INGREDIENTS,DIRECTIONS
    title =""
    description=""
    #link
    ingredients=""
    directions =""
    macros = ""
    if type == 'allrecipes':
        session = HTMLSession()
        response =session.get(link) 
        results =response.html.find("h1")
        if results:
            title +=(results[0].text)
        results =response.html.find(".recipe__steps")
        # Short Description
        results =response.html.find("h2")
        if results:
            description +=(results[0].text)

        # Link
        # Directions
        results =response.html.find(".recipe__steps")
        if results:
            directions+=(results[0].text)
        # MACROS
        results =response.html.find(".mntl-nutrition-facts-summary__table-row")
        if results:
            for i in range(len(results)):
                macros+=str(results[i].text)+","
        #print("\nIngredients\n") 
        results =response.html.find(".mntl-structured-ingredients__list-item") # Ingredients
        if results:
            for i in range(len(results)):
                ingredients+=str(results[i].text)+","
    elif type =='simplyRecipes':
        # Simplyrecipes
        # Data Needed: ,TITLE,DESCRIPTION,LINK,INGREDIENTS,DIRECTIONS

        # Title
        session = HTMLSession()
        response =session.get(link) 
        results =response.html.find("h1")
        if results:
           title =(results[0].text)

        # Short Description
        results =response.html.find("h2.heading__subtitle")
        if results:
            description =(results[0].text)

        # Link
        print(link)

        # Ingredients
        results =response.html.find(".structured-ingredients__list-item")
        if results:
            print("INGREDIENTS FOUND")
            for i in range(len(results)):
                ingredients+=str(results[i].text)+","
                
        # Directions
        results =response.html.find("#structured-project__steps_1-0")
        if results:
            directions=(results[0].text)

        # Macros
        results = response.html.find(".nutrition-info__table--row")
        if results:
            for i in range(len(results)):
                macros +=(results[i].text)+","
    return {"TITLE":title,"DESCRIPTION":description,"LINK":link,"INGREDIENTS":ingredients,"DIRECTIONS":directions,"MACROS":macros}
    

#########################################
###             DRIVER AREA           ###
#########################################

#All recipes increment page test

"""potential_recipe_pages =[]
query ="onion"    
pages =(increment_page(query,"allrecipes"))
session = HTMLSession()
for page in pages:
    response=session.get(page)
    search_results = response.html.links
    potential_recipe_pages.extend(list(filter(lambda link: link.find("https://www.allrecipes.com/recipe/")>=0,search_results)))
    
    
print(potential_recipe_pages)
print(len(potential_recipe_pages))"""

# Parse and Scrape Test

"""potential_recipe_pages =[]
query ="onion"    
pages =(increment_page(query,"simplyRecipes"))
session = HTMLSession()
for page in pages:
    response=session.get(page)
    search_results = response.html.links
    potential_recipe_pages.extend(list(filter(lambda link: link.find("https://www.simplyrecipes.com/recipes/")>=0,search_results)))
print(potential_recipe_pages)
print(scrape(potential_recipe_pages[0],"simplyRecipes"))"""

# Formal Scrape Test
print(scrape("https://www.simplyrecipes.com/recipes/caramelized_onion_dip/","simplyRecipes"))

"""session = HTMLSession()
link = "https://www.simplyrecipes.com/recipes/caramelized_onion_dip/"
response =session.get(link) # Directions"""

# Simplyrecipes
# Data Needed: ,TITLE,DESCRIPTION,LINK,INGREDIENTS,DIRECTIONS

"""# Title
results =response.html.find("h1")
if results:
    print(results[0].text)
print("\nDescription\n")

# Short Description
results =response.html.find("h2.heading__subtitle")
if results:
    print(results[0].text)

# Link
print(link)

# Ingredients
results =response.html.find(".structured-ingredients__list-item")
if results:
    for i in range(len(results)):
        print(results[i].text)
       
# Directions
results =response.html.find("#structured-project__steps_1-0")
if results:
    print(results[0].text)

# Macros
results = response.html.find(".nutrition-info__table--row")
if results:
    for i in range(len(results)):
        print(results[i].text)
"""



"""
response =session.get("https://www.allrecipes.com/recipe/16531/blooming-onion/")  # Calories
results =response.html.find(".mntl-nutrition-facts-summary__table-row")
if results:
    print(results[0].text)
print("\nIngredients\n") 
results =response.html.find(".mntl-structured-ingredients__list-item") # Ingredients
if results:
    for i in range(len(results)):
        print(results[i].text)"""
#########################################
###  Loads Json data and converts it  ###
#########################################

# Ingredient Json loader

"""# Timing Start
start_time = time.time()
path=os.getcwd()
path=os.path.join(path,'datasets')
path=os.path.join(path,'ingredient_data2.json')
path= open(path)
ingredients= json.load(path)

#ingredients= pd.read_csv(path,encoding='latin-1')
#ingredients=ingredients.to_dict()
# Timing End
end_time = time.time()
print("Time taken to retrieve:")
print(end_time-start_time)

newdict = dict()
for ingredient in ingredients["Sheet1"]:
    newdict[ingredient['name'].strip()]= ingredient

with open("ingredient_data.json2", "w") as outfile:
    json.dump(newdict, outfile)"""
