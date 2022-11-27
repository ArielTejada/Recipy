# ReciPy Server Endpoint - Documentation

# search_filter

```
Applies a filter to the search.
Calls take the form:

```

'/search/<string:query>/<string:filter>/<string:black_list>'

query: A comma seperated list with each ingredient to be searched.
filter: One of the following implemented filters isVegan,isKeto,isVegetarian. Anything else won't be used.
black_list: A comma seperated list with each ingredient to not be included. 