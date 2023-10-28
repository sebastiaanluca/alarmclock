#!/usr/bin/env python

import sys
import json
import re
import os

# Get the directory one level above where the script is located
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
config_file = os.path.join(root_dir, "config/default.json")

# Check if the correct number of arguments is provided
if len(sys.argv) != 2:
    print("Usage: {} <hour:minute>".format(sys.argv[0]))
    sys.exit(1)

# Command line argument in the format "hour:minute"
time_str = sys.argv[1]

# Validate the input format using regular expression
if not re.match(r'^\d{1,2}:\d{2}$', time_str):
    print("Invalid input format. Please use the 'hour:minute' format (e.g., '12:30').")
    sys.exit(1)

# Split the input string into hour and minute
hour, minute = time_str.split(':')

# Convert hour and minute to integers
hour = int(hour)
minute = int(minute)

try:
    # Read the JSON file
    with open(config_file, 'r') as f:
        data = json.load(f)

    # Update the hour and minute values
    data['alarm']['hour'] = hour
    data['alarm']['minute'] = minute

    # Write the updated JSON back to the file
    with open(config_file, 'w') as f:
        json.dump(data, f, indent=4)

    print(f"Alarm set to {hour}:{minute}")
except FileNotFoundError:
    print(f"Config file not found: {config_file}")
    sys.exit(1)
except json.JSONDecodeError:
    print(f"Error parsing JSON in {config_file}")
    sys.exit(1)
except Exception as e:
    print(f"An error occurred: {e}")
    sys.exit(1)
