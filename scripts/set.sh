#!/bin/bash

set -e

# Check if the correct number of arguments is provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <hour> <minute>"
    exit 1
fi

# Assign command line arguments to variables
hour="$1"
minute="$2"
config_file="config/default.json"

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "Error: jq is not installed. Please install jq to run this script."
    exit 1
fi

# Use jq to update the JSON file in-place
jq --arg new_hour "$hour" --arg new_minute "$minute" '.alarm.hour = $new_hour | .alarm.minute = $new_minute' "$config_file" >temp_config.json && mv temp_config.json "$config_file"

echo "Hour and minute updated successfully to $hour:$minute in $config_file"

exit 0
