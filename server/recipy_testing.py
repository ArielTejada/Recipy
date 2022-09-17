import recipy

# REMEMBER INSTALL DEPENDENCIES : pip install -r requirements.txt

# Use this file for testing calls of recipy functions.
# By running things here you are running the program entirely locally
# cd server
# Run with py recipy_testing.py

#Enter Search Entry Here:
ingredients ="onion,chicken"
dict =recipy.query_sites(ingredients)


## Filter Testing ##
#  Filters out ingredients from ingredient portion
def filter_out_ingredients():
    return