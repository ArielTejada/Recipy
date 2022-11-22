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


def load_recipe_data():
    with open(os.path.join(path_to_recipe_data,'central_recipe_data.pkl'), 'rb') as file:
        recipe_data = pickle.load(file)
    # Testing Search Queries
    recipe_data_with_ingredient_list =get_ingredients_list(recipe_data)
    recipe_data = remove_duplicates(recipe_data_with_ingredient_list)
    return recipe_data

def query_recipe_data(recipe_data,query):

    # Testing Search Queries
    recipe_data_with_ingredient_list =get_ingredients_list(recipe_data)

    # We remove duplicates for ease
    recipe_data_with_ingredient_list = remove_duplicates(recipe_data_with_ingredient_list)


    # Filter splices queries by commas and searches with np.and
    filter = ingredient_filter(query,recipe_data_with_ingredient_list)

    # We can apply this to the original dataframe to filter it down
    return recipe_data_with_ingredient_list[filter]

def mass_query_recipe_data(recipe_data, query_data):
    # Assume query_data is a list
    data = query_recipe_data(recipe_data,query_data[0])
    for q in range(1,len(query_data)):
        pd.concat([data,query_recipe_data(recipe_data,query_data[q])], axis=1)
    return data

def get_recipe_data(recipe_data,recipe_ID):
    recipe_ID = int(recipe_ID)
    return recipe_data.iloc[recipe_ID]

def mass_get_recipe_data(recipe_data,query_data):
    
    query_list = query_data.split(',')
    query_list = list(map(int, query_list))
    data = recipe_data.iloc[query_list]
    return data

#
#   KMEANS_Reccomendation(query_data,pantry):
#
#       query_data  : comma seperated list of recipes
#       pantry      : comma seperated list of pantry ingredients
#
#       Returns     : A dictionary with reccomendations corresponding to the index.
#                     example: dict[query_data[0]] = {list of recipes recomended based on query_data[0]}

def KMEANS_Reccomendation(query_data,pantry,recipe_data):
    # Note every thing should be in grams
    NUMERICAL_COLS = ['CALORIES','FAT','CARBS','PROTEIN']
    
    """data =(recipe_data[NUMERICAL_COLS])"""

    # We can make this into a function that works on arbitary samples by replacing sample_data with parameter of favorited users
    # Will need way to select data from database
    
    query_based_data = mass_get_recipe_data(recipe_data,query_data) # FInished
    pantry_based_data = mass_query_recipe_data(recipe_data,pantry)  # FInish this function and test it!
    sample_data = pd.concat([query_based_data,pantry_based_data])
    # Data we are using to do K means
    #sample_data = sample_data[NUMERICAL_COLS]
    sample_model = KMeans(3, random_state=0).fit(sample_data[NUMERICAL_COLS])
    sample_data['LABEL'] = sample_model.predict(sample_data[NUMERICAL_COLS])

    # For each recipe in the query list containing recipes we want recconmendations in we want to return all other recipes in the same cluster.
    reccomendations = dict()
    for q in query_data.split(','):
        #Look up the cluster of q and set it equal to the value at index q.
        q =int(q)
        reccomendations[q] = sample_data[sample_data['LABEL'] ==sample_data.iloc[q]['LABEL']]['TITLE'].to_list()
    return reccomendations

# Converts a list embeded in a string to a list. Used to make A list that has be transformed into a string back into a list.
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

def standardize_lookup(lookup):
    lookup['name']= lookup['name'].apply(lambda x: x.replace("_",""))
    lookup['name']= lookup['name'].apply(lambda x: x.replace(" ",""))
    return lookup

################################################
#
#   Lookup functions: Used to look up vegan,vegetarian,keto...
#                                  
################################################
# looks up if isVegan in lookup table
def look_up_isVegan(ingredients_list,lookup):
    if len(ingredients_list)<1:
        return 1
    for ingredient in ingredients_list:
        isVegan=lookup.loc[lookup['name']==ingredient.strip().replace(" ","")].iloc[0]['vegan']
        if isVegan==0:
            return 0
    return 1

def look_up_isVegetarian(ingredients_list,lookup):
    if len(ingredients_list)<1:
        return 1
    for ingredient in ingredients_list:
        isVegan=lookup.loc[lookup['name']==ingredient.strip().replace(" ","")].iloc[0]['vegetarian']
        if isVegan==0:
            return 0
    return 1

def look_up_isKeto(ingredients_list,lookup):
    if len(ingredients_list)<1:
        return 1
    for ingredient in ingredients_list:
        isVegan=lookup.loc[lookup['name']==ingredient.strip().replace(" ","")].iloc[0]['keto']
        if isVegan==0:
            return 0
    return 1
#Save recipe data
def save_pickle_data(df,name="volatile_central_recipe_data.pkl"):
    
    with open(os.path.join(path_to_recipe_data,name), 'wb') as f:
        pickle.dump(df, f)
#Load recipe data
def load_pickle_data(name="central_recipe_data.pkl"):
    with open(os.path.join(path_to_recipe_data,name), 'rb') as file:
        return pickle.load(file)
        
################################## 
# Paths to useful directories
##################################

# These are some global vars that  are referenced by a lot of the functions here
# They need to be edited upon deploy
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
#recipe_data = pd.read_csv(path_to_central_recipe_data)
#We use the pickle file to store our data now
with open(os.path.join(path_to_recipe_data,'central_recipe_data.pkl'), 'rb') as file:
    recipe_data = pickle.load(file)

end_time = time.time()
recipe_data_access_time =end_time-start_time

#################################
#       DRIVER CODE             #
#################################

#           TO DO LIST
# ------------------------------
# - MAKE A REGRESSION MODEL THAT RECCOMENDS RANGES OF FEATURES
# - MAKE A KMEANS MODEL
#
#           Resources
#  -----------------------------
#  https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html
#  https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html

# NOTE: 11/19/22 
# Need to add dietary restriction cols to data.
# Make Kmeans reccomendation function. Should abceprt a dataset,list of queries and return the clusters of the queried recipe data
# Add dietary restriction filter
# Finalize changes in the Deplyed endpoints.

#print(recipe_data)
#print(os.listdir(path_to_recipe_data))

pantry_data =["onion","pork"]
query_data ="12,13,5"
# print(mass_query_recipe_data(recipe_data,pantry_data))
# print(mass_get_recipe_data(recipe_data,query_data))

reccomendation =(KMEANS_Reccomendation(query_data,pantry_data,recipe_data))
for r in reccomendation.keys():
    print(r)
    print(reccomendation[r])