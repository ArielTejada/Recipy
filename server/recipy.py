from distutils.command.build import build
import time
import urllib
import pandas as pd
from requests_html import HTML
from requests_html import HTMLSession
from requests_html import AsyncHTMLSession

#https://practicaldatascience.co.uk/data-science/how-to-scrape-google-search-results-using-python
#https://requests.readthedocs.io/projects/requests-html/en/latest/

"""
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
        directions = sub_test.html.find(".{true: 'checkList__item'}[true]")
        for i in range(len(directions)):
            #direction stores all information
            directions[i]=directions[i].text
        print(directions)
        print("Took:"+str((finish_time-start_time))+" seconds")

def query_sites(query):
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
        #selector val: .paragraph
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

    RECIPE_data = pd.DataFrame(RECIPE_data)
    csv_Title=query+ str("_results") 
    RECIPE_data.to_csv(csv_Title)
    
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
        