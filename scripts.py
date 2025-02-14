import json

def process_json_files():
    all_events = []
    current_id = 1


    for i in range(1, 17):
        filename = f"configs/data{i}.json"
        
        try:
            with open(filename, 'r') as file:
                data = json.load(file)
                

                events = []
                if isinstance(data, list):
                    events = data
                elif isinstance(data, dict):
                    if 'events' in data:
                        events = data['events']
                    else:

                        events = [data]
                

                for event in events:
                    event['id'] = current_id
                    all_events.append(event)
                    current_id += 1
                    
        except FileNotFoundError:
            print(f"Warning: {filename} not found")
        except json.JSONDecodeError:
            print(f"Warning: {filename} contains invalid JSON")


    output = {"events": all_events}
    with open('configs/data.json', 'w') as outfile:
        json.dump(output, outfile, indent=2)

process_json_files()
