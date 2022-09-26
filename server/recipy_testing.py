import recipy
from requests_html import HTMLSession
import time
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

#Enter Search Entry Here:
#ingredients ="onion,chicken"
#dict =recipy.query_sites(ingredients)

#simplyRecipes(ingredients)
print(recipy.build_user_path('Chris'))