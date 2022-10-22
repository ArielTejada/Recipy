from flask import jsonify
from sqlalchemy import false
import recipy
from requests_html import HTMLSession
import time
import os
import numpy as np
import pandas as pd
import bcrypt
import json


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

"""print("Ingredient Data:")
print(ingredient_data.columns)
print(len(ingredient_data))
print("Access Time:"+str(ingredient_data_access_time))

print("Recipe Data:")
print(recipe_data.columns)
print(len(recipe_data))
print("Access Time:"+str(recipe_data_access_time))"""

print(recipe_data.head(5))
print(recipe_data.loc[recipe_data["MACROS"].notna()])

# Columns
print(recipe_data.columns)
# How to check a
# Need function to get ingredient/ check if recipe has ingredient. 
# To do so we shall split it by commas.

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
    if len(queries)>1 and len(queries)<=2:
        ingredient_filter = np.logical_and(ingredient_filter,recipe_data_with_ingredient_list["INGREDIENTS_LIST"].apply(lambda x: contains_ingredient(queries[1],x)))
    if len(queries)>2:
        for i in range(len(queries)):
            ingredient_filter = recipe_data_with_ingredient_list["INGREDIENTS_LIST"].apply(lambda x: contains_ingredient(queries[i],x))
    
    # We can apply this to the original dataframe
    # ingredient_filter(recipe_data_with_ingredient_list[ingredient_filter])

    return ingredient_filter
    
# Testing Search Queries
query = "oni,bacon"

print(get_ingredients_list(recipe_data)["INGREDIENTS_LIST"])

# We remove duplicates for ease
recipe_data = remove_duplicates(recipe_data)
recipe_data_with_ingredient_list =get_ingredients_list(recipe_data)

# Filter splices queries by commas and searches with np.and
filter = ingredient_filter(query,recipe_data_with_ingredient_list)

# We can apply this to the original dataframe
print(recipe_data_with_ingredient_list[filter])
