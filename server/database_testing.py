from flask import jsonify
import recipy
from requests_html import HTMLSession
import time
import os
import numpy 
import pandas as pd
import bcrypt
import json


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

print(recipe_data)
