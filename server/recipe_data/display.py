import pandas as pd

current_recipedata=pd.read_csv("central_recipe_data.csv")
oldest_recipedata = pd.read_csv("Version 1\central_recipe_data.csv")
print(" Orignal Dataset ".center(50,"*"))
print(oldest_recipedata)
print(" Current Dataset ".center(50,"*"))
print(current_recipedata)


