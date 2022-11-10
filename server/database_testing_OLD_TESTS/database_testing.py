from email.quoprimime import quote
from tkinter import image_names
from flask import jsonify
from requests import session
from sklearn.neighbors import NearestNeighbors
from requests_html import HTMLSession
import time
import os
import numpy as np
import pandas as pd
import scipy
import bcrypt
import json
import recipy

def get_ingredients_list(recipe_data):
    ingredients = pd.DataFrame(recipe_data.loc[recipe_data["INGREDIENTS"].notna()])
    ingredients["INGREDIENTS_LIST"] = ingredients["INGREDIENTS"].apply(lambda x: x.split(','))
    return ingredients

# We also might want other filters such as...

def remove_duplicates(data):
    return data.drop_duplicates(subset=['TITLE'])

# Checks if ingredient is mentioned in ingredients for an indredient list. To be used as an apply function
# where df.apply(lambda x: contains_ingredient(query,x)) queries a dataframe if its ingredient 
def contains_ingredient(ingredient, ingredient_list):
    
    for raw_ingredient in ingredient_list:
        if raw_ingredient.find(ingredient)>0:
            return True
    return False

def ingredient_filter(query_string,recipe_data):
    queries = query_string.split(',')
    
    recipe_data = remove_duplicates(recipe_data)
    recipe_data_with_ingredient_list = get_ingredients_list(recipe_data)

    ingredient_filter = recipe_data_with_ingredient_list["INGREDIENTS_LIST"].apply(lambda x: contains_ingredient(queries[0],x))
    if len(queries)>1:
        ingredient_filter = np.logical_and(ingredient_filter,recipe_data_with_ingredient_list["INGREDIENTS_LIST"].apply(lambda x: contains_ingredient(queries[1],x)))
    if len(queries)>2:
        for i in range(len(queries)):
            ingredient_filter = np.logical_and(ingredient_filter,recipe_data_with_ingredient_list["INGREDIENTS_LIST"].apply(lambda x: contains_ingredient(queries[i],x)))
    
    # We can apply this to the original dataframe
    # ingredient_filter(recipe_data_with_ingredient_list[ingredient_filter])

    return ingredient_filter

def NearestNeighbor_Reccomendation():
    # IDEA: Given a list of X data points as favorited recipes we should be able to preform a k nearest neighbor reccomendation
    # (SOURCE) https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.BallTree.html#sklearn.neighbors.BallTree
    return
# Paths to useful directories

path_to_cwd =(os.getcwd())
path_to_datasets= os.path.join(path_to_cwd,"datasets")

path_to_ingredient_data= os.path.join(path_to_datasets,"Manually Combined Dataset.csv")

path_to_server= os.path.join(path_to_cwd,"server")
path_to_recipe_data = os.path.join(path_to_server,"recipe_data")
path_to_central_recipe_data = os.path.join(path_to_recipe_data,"central_recipe_data.csv")

start_time = time.time()
ingredient_data = pd.read_csv(path_to_ingredient_data, encoding="latin-1")
end_time = time.time()
ingredient_data_access_time =end_time-start_time

start_time = time.time()
recipe_data = pd.read_csv(path_to_central_recipe_data)
end_time = time.time()
recipe_data_access_time =end_time-start_time


def load_recipe_data():
    recipe_data = pd.read_csv(path_to_central_recipe_data)
    # Testing Search Queries
    recipe_data_with_ingredient_list =get_ingredients_list(recipe_data)
    recipe_data = remove_duplicates(recipe_data_with_ingredient_list)
    return recipe_data

def query_recipe_data(query):
    recipe_data = pd.read_csv(path_to_central_recipe_data)

    # Testing Search Queries
    recipe_data_with_ingredient_list =get_ingredients_list(recipe_data)

    # We remove duplicates for ease
    recipe_data_with_ingredient_list = remove_duplicates(recipe_data_with_ingredient_list)


    # Filter splices queries by commas and searches with np.and
    filter = ingredient_filter(query,recipe_data_with_ingredient_list)

    # We can apply this to the original dataframe to filter it down
    return recipe_data_with_ingredient_list[filter]

#################################
#       DRIVER CODE             #
#################################

"""
# Code to make the dictionary resulta appear more normal
# Timing Start
start_time = time.time()
sample_data= pd.read_csv('baconSEARCH_RESULT.csv')

sample_data = sample_data.to_dict()
new_dict = dict()

#Code to reformat a pandas data frame into traditionally readable json
for i in range(size):
    entry = dict()
    entry['TITLE'] = sample_data[i]['TITLE']
    entry["DESCRIPTION"] = sample_data[i]["DESCRIPTION"]
    entry["LINK"] = sample_data[i]["LINK"]
    entry["INGREDIENTS"] = sample_data[i]["INGREDIENTS"]
    new_dict[sample_data[i]['TITLE']] 

print("Time taken to retrieve:")
end_time = time.time()
print(end_time-start_time)
path=os.getcwd()
path=os.path.join(path,'datasets')
path=os.path.join(path,'ingredient_data2.json')
path= open(path)
ingredients= json.load(path)

#ingredients= pd.read_csv(path,encoding='latin-1')
#ingredients=ingredients.to_dict()
# Timing End



newdict = dict()
for ingredient in ingredients["Sheet1"]:
    newdict[ingredient['name'].strip()]= ingredient

with open("ingredient_data.json2", "w") as outfile:
    json.dump(newdict, outfile)"""

"""
print("Ingredient Data:")
print(ingredient_data.columns)
print(len(ingredient_data))
print("Access Time:"+str(ingredient_data_access_time))

print("Recipe Data:")
print(recipe_data.columns)
print(len(recipe_data))
print("Access Time:"+str(recipe_data_access_time))


print(recipe_data.head(5))
print(recipe_data.loc[recipe_data["MACROS"].notna()])


print(recipe_data.columns)
# How to check a
# Need function to get ingredient/ check if recipe has ingredient. 
# To do so we shall split it by commas.
"""

# Testing Search Queries

query = "onion,bacon,garlic,bread"
recipe_data_with_ingredient_list =get_ingredients_list(recipe_data)
ingredient_names =ingredient_data["name"].to_list()
#print(ingredient_names)

# We remove duplicates for ease
recipe_data_with_ingredient_list = remove_duplicates(recipe_data_with_ingredient_list)


# Filter splices queries by commas and searches with np.and
# filter = ingredient_filter(query,recipe_data_with_ingredient_list)

"""#
# Favoriting Test
#"""

# We can apply this to the original dataframe to filter it down
# print(recipe_data_with_ingredient_list[filter])

# recipe_ID = recipe_data_with_ingredient_list.loc[recipe_data_with_ingredient_list['TITLE']=="Steamed Mussels in Tomato Sauce",['Unnamed: 0']]

# #To acquire a data point we transform into np array and index the np array
# recipe_ID = recipe_ID.values[0]
# print("ID:")
# print(recipe_ID[0])


# Scrape test
def scrape_image(link):
    session =HTMLSession()
    image_links = []
    site = session.get(link)
    #Find all image divs tags
    image_divs= site.html.find('img')
    #Takes all Images
    for i in range(len(image_divs)):
        raw_tag =(image_divs[i])
        quotes = raw_tag.html.split("\"")
        image = quotes[1] #Grabs the link if an image ends in png or jpg
        if(image.find("jpg")>0 or image.find(".png")>0):
            image_links.append(image)
    return image_links

"""#IMage Scrape test"""

# # First we grab a link from the data
# query_link =recipe_data['LINK'][10]
# session =HTMLSession()
# site = session.get(query_link)
# # Find all image divs tags
# image_divs= site.html.find('img')
# #First one should be good... maybe
# first_image =(image_divs[4])
# quotes = first_image.html.split("\"")
# print(quotes[1])



sample = recipe_data.sample(n=5)
start_time= time.time_ns()
sample['img'] =sample['LINK'].apply(scrape_image)
end_time= time.time_ns()
print(sample)
print("Time for 5:")
print(end_time-start_time)

"""##################################
#  Scraping Images for All Data  #
##################################"""

#recipe_data['IMAGE_LINKS'] = recipe_data['LINK'].apply(scrape_image)
#recipe_data.to_csv('Central_Recipe_Data_with_images.csv')

#sample_data =pd.read_csv('image_tests.csv') #Start with sample... append to it with rest of data... so you can save and restart as needed

#recipes need to have a macro col

"""##################################
#  Making Macros into individual Cols  #
##################################"""

# sample_data = recipe_data[recipe_data.notna()]
# print(sample_data)
# # We need to extract macros
# raw_string = pd.DataFrame()
# raw_string["MACRO_LIST"] = sample_data['MACROS'].apply(lambda x : x.split("\r\n") if isinstance(x,str) else "")

# print(raw_string["MACRO_LIST"])

# # Make Macro Cols for CALORIES, FAT,Carbs,Protien

# sample_data['CALORIES'] = raw_string["MACRO_LIST"].apply(lambda x : x[0] if isinstance(x,list) else 0)
# print(sample_data['CALORIES'])
# sample_data['FAT'] = raw_string["MACRO_LIST"].apply(lambda x : x[1].split(",")[1] if isinstance(x,list) else 0)
# print(sample_data['FAT'])
# sample_data['CARBS'] = raw_string["MACRO_LIST"].apply(lambda x : x[2].split(",")[1] if isinstance(x,list) else 0)
# print(sample_data['CARBS'])
# sample_data['PROTEIN'] = raw_string["MACRO_LIST"].apply(lambda x : x[3].split(",")[1] if isinstance(x,list) and len(x)>3 else 0)
# print(sample_data['PROTEIN'])
# sample_data.to_csv("Central_Data_with_Macros.csv")



"""# ######################################################
# Making sure all our values are ints by removing units
# ######################################################"""

# recipe_data = pd.read_csv("Central_Data_with_Macros.csv") # NOTE: This assumes that we have left this data is cwd... Its supposed to be in /recipe_data.
# cols = ["FAT","CARBS","PROTEIN"]
# print(recipe_data[cols])
# for col in cols:
#     recipe_data[col] = recipe_data[col].apply(lambda x : x[0:len(x)-1] if x!='0' and isinstance(x,str) and x[-1]=="g" else int(0))
# print(recipe_data[cols])
# recipe_data.to_csv("Central_Data_with_Macros.csv")
    

# I need to now formally check if an ingredient exists in each recipe
# This can be done by making a contains col for each ingredient

# This can be done by writing a function that checks if every entry  is in the listed ingredients section.
# If it is the ingredient is added to a list of ingredients for that recipe

def has_ingredients(recipe,possible_ingredients):
    ingredient_list =[] #List of all ingredients found
    for ingredient in possible_ingredients:
        if isinstance(recipe,float):
            return []
        if recipe.find(ingredient)>0:
            ingredient_list.append(ingredient)
    return ingredient_list

recipe_data = pd.read_csv("Central_Data_with_Macros.csv") # NOTE: This assumes that we have left this data is cwd... Its supposed to be in /recipe_data.
print(recipe_data.columns)
print(ingredient_data)
ingredients = ingredient_data['name'].apply(lambda x : x.replace("_"," ")) #replace underscore with space
ingredients =ingredients.to_list()
print(ingredients)

sample_data = recipe_data.sample(5)
# Test for sample of 5
#print(sample_data['INGREDIENTS'].apply(lambda x: has_ingredients(x,ingredients)))

recipe_data['has_ingredients'] = recipe_data['INGREDIENTS'].apply(lambda x: has_ingredients(x,ingredients))
recipe_data.to_csv("Central_Recipe_Data_with_has_ingredients.csv")
# MAKE A REGRESSION MODEL THAT RECCOMENDS RANGES OF FEATURES

# MAKE A KMEANS MODEL
#https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html
#https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html