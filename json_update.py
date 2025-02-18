import json

def convert_tags_format(filename):
    # Read the JSON file
    with open(filename, 'r') as file:
        data = json.load(file)

    # Process each event
    for event in data:
        if 'tags' in event:
            # Handle string format with commas
            if isinstance(event['tags'], str):
                # Split by comma and clean up each tag
                tags = [tag.strip() for tag in event['tags'].split(',')]
                event['tags'] = tags
            # Handle if already a list but needs quotation standardization
            elif isinstance(event['tags'], list):
                event['tags'] = [str(tag).strip() for tag in event['tags']]

    # Write the modified data back to the file
    with open(filename, 'w') as file:
        json.dump(data, file, indent=2)

# Run the conversion
try:
    convert_tags_format('configs/data.json')
    print("Tags format conversion completed successfully!")
except Exception as e:
    print(f"An error occurred: {str(e)}")
