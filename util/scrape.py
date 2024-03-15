import pandas as pd

# Specify the path to your Excel file
excel_file_path = '/home/red/Desktop/scraped_data.xlsx'

# Read the Excel file
df = pd.read_excel(excel_file_path)

# Convert the DataFrame to JSON
json_data = df.to_json(orient='records')

# Print the JSON data
print(json_data)

# Optionally, write the JSON data to a file
with open('scrapedData.json', 'w') as json_file:
    json_file.write(json_data)
