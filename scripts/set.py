#!/usr/bin/env python

import sys
import json

# Check if the correct number of arguments is provided
if len(sys.argv) != 3:
    print("Usage: {} <hour> <minute>".format(sys.argv[0]))
    sys.exit(1)

# Command line arguments
hour = sys.argv[1]
minute = sys.argv[2]
config_file = "config/default.json"

try:
    # Read the JSON file
    with open(config_file, 'r') as f:
        data = json.load(f)

    # Update the hour and minute values
    data['alarm']['hour'] = int(hour)
    data['alarm']['minute'] = int(minute)

    # Write the updated JSON back to the file
    with open(config_file, 'w') as f:
        json.dump(data, f, indent=4)

    print(f"Hour and minute updated successfully to {hour}:{minute} in {config_file}")
except FileNotFoundError:
    print(f"Config file not found: {config_file}")
    sys.exit(1)
except json.JSONDecodeError:
    print(f"Error parsing JSON in {config_file}")
    sys.exit(1)
except Exception as e:
    print(f"An error occurred: {e}")
    sys.exit(1)
