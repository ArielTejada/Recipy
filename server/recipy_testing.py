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
    ingredients = ingredients.split(sep=",")
    simplyRecipes_searchLink = recipy.build_link(ingredients,type="simplyrecipes")
    print(simplyRecipes_searchLink)
    #Inlude ingredients exploitation


    #test = session.get('https://www.simplyrecipes.com/search?q=onion')

    #print(test.html.links) 
    #prints all the links on a webpage

    test = session.get(simplyRecipes_searchLink)

    #recipe with lowercase is html element. 
    #Recipe with uppercase is data value.
    #  
    
    recipe_titles =test.html.find('.card__content') # List of recipe short titles
    print(len(recipe_titles))
    print(recipe_titles)
    recipe_descriptions =[""]*len(recipe_titles) # List of recipe short decriptions [NOT GIVEN IN Simplyrecipes.com]
    print(len(recipe_descriptions))
    print(recipe_descriptions)
    recipe_link =test.html.find('.comp card') # List of recipe links
    print(recipe_link)
    print("Break?")
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
        Recipe_DESCRIPTION.append(recipe_descriptions[i])
        #print("RECIPE LINK")
        Recipe_LINK.append(str(recipe_link[i].links)[2:-2])
        #print("INGREDIENTS")
        
        print(recipe_titles[i].text)
        print(recipe_descriptions[i])
        print((recipe_link[i].links)[2:-2]) 

        """#Enters a the website page that stores the websites
        sub_test=session.get(str(recipe_link[i].links)[2:-2]) 
        
        #Uses selector to parse out each ingredient with ".ingredients-item" class 
        ingredients = sub_test.html.find(".ingredients-item")
        for i in range(len(ingredients)):
            #ingredients stores all information
            ingredients[i]=ingredients[i].text
        Recipe_INGREDIENTS.append(ingredients)

       
        #finish_time = time.time()
        #selector val: .paragraph
        directions = sub_test.html.find(".paragraph")
        for i in range(len(directions)):
            #direction stores all information
            directions[i]=directions[i].text
        Recipe_DIRECTIONS.append(directions)"""
        #print("Took:"+str((finish_time-start_time))+" seconds")

def build_link(ingredient,type="allrecipes",):
    link=""
    if(type=="allrecipes"):
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

def allRecipes(query):

    session = HTMLSession()
    #Simplyrecipes = 'https://www.simplyrecipes.com/search?q=?'
    #Example Link: https://www.simplyrecipes.com/search?q=onion
    #
    #  Structure of Search
    # "https://www.simplyrecipes.com/search?q=" + query 
    #
    
    # Simplyrecipes.com Exploitation [INSERT UNDERHERE]

    ingredients = query
    allRecipes_searchLink = build_link(ingredients,type="allrecipes")
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
    return pd.DataFrame(data)

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
    return {"TITLE":title,"DESCRIPTION":link,"LINK":link,"INGREDIENTS":ingredients,"DIRECTIONS":directions}
    

#########################################
###             DRIVER AREA           ###
#########################################
query ="onion"    
print(allRecipes(query))

#Figuring out selectors for relevant data

# Data Needed: ,TITLE,DESCRIPTION,LINK,INGREDIENTS,DIRECTIONS
"""session = HTMLSession()
response =session.get("https://www.allrecipes.com/recipe/82659/old-fashioned-onion-rings/") # Directions
results =response.html.find("h1")
if results:
    print(results[0].text)
results =response.html.find(".recipe__steps")
# Short Description
print("Description")
results =response.html.find("h2")
if results:
    print(results[0].text)

# Link
print("https://www.allrecipes.com/recipe/82659/old-fashioned-onion-rings/")
results =response.html.find(".recipe__steps")
if results:
    print(results[0].text)
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
