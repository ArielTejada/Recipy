from flask import jsonify
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
print(ingredient_names)

# We remove duplicates for ease
recipe_data_with_ingredient_list = remove_duplicates(recipe_data_with_ingredient_list)


# Filter splices queries by commas and searches with np.and
filter = ingredient_filter(query,recipe_data_with_ingredient_list)

# We can apply this to the original dataframe to filter it down
print(recipe_data_with_ingredient_list[filter])

recipe_ID = recipe_data_with_ingredient_list.loc[recipe_data_with_ingredient_list['TITLE']=="Steamed Mussels in Tomato Sauce",['Unnamed: 0']]

#To acquire a data point we transform into np array and index the np array
recipe_ID = recipe_ID.values[0]
print("ID:")
print(recipe_ID[0])
""""""



