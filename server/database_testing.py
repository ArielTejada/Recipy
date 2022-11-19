from email.quoprimime import quote
from tkinter import image_names
from flask import jsonify
from requests import session
import matplotlib.pyplot as plt
from sklearn.neighbors import NearestNeighbors
from sklearn.cluster import KMeans
from requests_html import HTMLSession
import time
import os
import numpy as np
import pandas as pd
import scipy
import bcrypt
import json
import recipy
import pickle

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
    # This function quieries the ingredient list to check if query is in that list.

    return ingredient_filter

def NearestNeighbor_Reccomendation():
    # IDEA: Given a list of X data points as favorited recipes we should be able to preform a k nearest neighbor reccomendation
    # (SOURCE) https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.BallTree.html#sklearn.neighbors.BallTree
    return

# Paths to useful directories
# These are some global vars that  are referenced by a lot of the functions here

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

def mass_query_recipe_data(query_data):
    # Assume query_data is a list
    data = query_recipe_data(query_data[0])
    for q in range(1,len(query_data)):
        data.concat(data,query_recipe_data(q))
    return data

def KMEANS_Reccomendation(query_data,pantry):
    # Note every thing should be in grams
    NUMERICAL_COLS = ['CALORIES','FAT','CARBS','PROTEIN']
    
    """data =(recipe_data[NUMERICAL_COLS])"""

    # We can make this into a function that works on arbitary samples by replacing sample_data with parameter of favorited users
    # Will need way to select data from database
    mass_query_recipe_data

    pantry_based_data = query_recipe_data

    #sample_data = # Data we are using to do K means
    sample_model = KMeans(3, random_state=0).fit(sample_data[NUMERICAL_COLS])
    sample_data['LABEL'] = sample_model.predict(sample_data)

    # For each recipe in the query list containing recipes we want recconmendations in we want to return all other recipes in the same cluster.
    return

#Converts a list embeded in a string to a list
def convert_list_string_to_string(list_string):
    
    if list_string =="[]":
        # Empty list
        return []
    else:
        list_string = list_string.replace('\'',"")
        actual_list = list_string[1:len(list_string)-1].split(",")
        return actual_list
        """for i in ingredient_list[1:len(ingredient_list)-1].split(","):
            print(i)
            print(ingredient_data['name'].loc[[i,'vegan']] )"""
#################################
#       DRIVER CODE             #
#################################

# TO DO LIST
# MAKE A REGRESSION MODEL THAT RECCOMENDS RANGES OF FEATURES
# MAKE A KMEANS MODEL
#https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html
#https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html
with open(os.path.join(path_to_recipe_data,'central_recipe_data.pkl'), 'rb') as file:
    recipe_data = pickle.load(file)
print(recipe_data)
print(recipe_data.columns)
print(recipe_data['has_ingredients'])
print(ingredient_data.columns)



#Has ingredient
"""ingredient_names =ingredient_data['name'].apply(lambda x : x.replace(" ",""))
ingredient_names =ingredient_names.apply(lambda x : x.replace("_"," "))
print(ingredient_names)
print(ingredient_names[356][0:4])

def has_ingredients(raw,ingredients):
    ingredients_in_raw = []
    for ingredient in ingredients:
        if isinstance(raw,float):
            return []
        elif(raw.find(ingredient)>-1):
            ingredients_in_raw.append(ingredient)
    return ingredients_in_raw

raw =recipe_data['INGREDIENTS'].iloc[1]
print(raw)
print(has_ingredients(raw,ingredient_names))

recipe_data['has_ingredients'] = recipe_data['INGREDIENTS'].apply(lambda x : has_ingredients(x,ingredient_names))
recipe_data.to_csv("has_ingredient_recipedata.csv")"""

print()

# Note every thing should be in grams
NUMERICAL_COLS = ['CALORIES','FAT','CARBS','PROTEIN']
data =(recipe_data[NUMERICAL_COLS])

Kmean_model = KMeans(6, random_state=0).fit(data)
centers =Kmean_model.cluster_centers_

# We can make this into a function that works on arbitary samples by replacing sample_data with parameter of favorited users
# Will need way to select data from database


sample_data = data.sample(10) # We make a sampling of data from users
sample_model = KMeans(3, random_state=0).fit(sample_data)
sample_data['LABEL'] = sample_model.predict(sample_data)
COLORS = ['indigo','green','blue','purple','darkorange']

#Scatter plots of sample
#plt.scatter(sample_data[sample_data['LABEL'] == 0],)

# print(sample_data)
# print(sample_data['LABEL'])
# graph = plt.figure()
# ax = graph.add_subplot(111, projection='3d')
# img =ax.scatter(sample_data[NUMERICAL_COLS[0]], sample_data[NUMERICAL_COLS[1]], sample_data[NUMERICAL_COLS[2]],c=sample_data[NUMERICAL_COLS[3]],
#              s=50, cmap=plt.hot())
# graph.colorbar(img)
# centers = sample_model.cluster_centers_
# for center in centers:
#     img= ax.scatter(center[0],center[1],center[2],c=center[3],s=50,)
#     img= ax.text(center[0],center[1],center[2], "Center")            

# ax.set_xlabel('Calories')
# ax.set_ylabel('Fat (g)')
# ax.set_zlabel('Carbs (g)')
# # Add Ploted centers

# plt.show()

############################################################################################################

# 4D Graphing Code
# https://stackoverflow.com/questions/14995610/how-to-make-a-4d-plot-with-matplotlib-using-arbitrary-data
# graph = plt.figure()
# ax = graph.add_subplot(111, projection='3d')
# img =ax.scatter(recipe_data[NUMERICAL_COLS[0]], recipe_data[NUMERICAL_COLS[1]], recipe_data[NUMERICAL_COLS[2]],c=recipe_data[NUMERICAL_COLS[3]],
#             s=50, cmap=plt.hot())
# graph.colorbar(img)


# plt.show()
# Similarity Score
# We can score recipes by similarity awarding a point if they have: 
# 1.indredients in common(1 for each)
# 2.fit diet => We determine if an ingredient fits a diet based on if all of its ingredients are 'vegan', 'vegitarian', 'keto', ;diabetic, or pescaterian 
#
# 
