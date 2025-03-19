import glob
import os
import numpy as np

import matplotlib.pyplot as plt

# Define the file patterns
normal_file_patterns = [
    "response_times_normal_1%.txt",
    "response_times_normal_5%.txt",
    "response_times_normal_10%.txt",
    "response_times_normal_20%.txt",
    "response_times_normal_30%.txt",
    "response_times_normal_40%.txt",
    "response_times_normal_50%.txt",
    "response_times_normal_60%.txt",
    "response_times_normal_70%.txt",
    "response_times_normal_80%.txt",
    "response_times_normal_90%.txt",
    "response_times_normal_100%.txt",
]
populatefile_patterns = [
    "response_times_populate_1%.txt",
    "response_times_populate_5%.txt",
    "response_times_populate_10%.txt",
    "response_times_populate_20%.txt",
    "response_times_populate_30%.txt",
    "response_times_populate_40%.txt",
    "response_times_populate_50%.txt",
    "response_times_populate_60%.txt",
    "response_times_populate_70%.txt",
    "response_times_populate_80%.txt",
    "response_times_populate_90%.txt",
    "response_times_populate_100%.txt",
]
lookup_file_patterns = [
    "response_times_lookup_1%.txt",
    "response_times_lookup_5%.txt",
    "response_times_lookup_10%.txt",
    "response_times_lookup_20%.txt",
    "response_times_lookup_30%.txt",
    "response_times_lookup_40%.txt",
    "response_times_lookup_50%.txt",
    "response_times_lookup_60%.txt",
    "response_times_lookup_70%.txt",
    "response_times_lookup_80%.txt",
    "response_times_lookup_90%.txt",
    "response_times_lookup_100%.txt",
]

def read_last_line(filepath):
    """Reads the last line of a file."""
    try:
        with open(filepath, 'r') as f:
            for line in f:
                pass
            return float(line.strip()) * 1000
    except FileNotFoundError:
        print(f"File not found: {filepath}")
        return None
    except ValueError:
        print(f"Could not convert line to float in {filepath}")
        return None

def get_response_time_list(file_patterns):
    response_times = []
    for pattern in file_patterns:
        # Look for the file pattern in the current directory
        filepath = pattern  # Use the filename directly since it's the exact path
        last_line = read_last_line(os.path.join("test", filepath))
        if last_line is not None:
            response_times.append(last_line)
        else:
            response_times.append(None)  # Append None if reading fails
    return response_times

# Collect the last response times
normal_last_response_times = get_response_time_list(normal_file_patterns)
populate_last_response_times = get_response_time_list(populatefile_patterns)
lookup_last_response_times = get_response_time_list(lookup_file_patterns)

# Create the plot
plt.figure(figsize=(10, 6))  # Adjust figure size as needed
x_labels_percent = [os.path.splitext(pattern)[0].split("_")[-1] for pattern in normal_file_patterns]
x_labels_numbers = [os.path.splitext(pattern)[0].split("_")[-1].split("%")[0]+"k" for pattern in normal_file_patterns]
x_positions = range(len(normal_last_response_times))

plt.plot(x_positions, normal_last_response_times, marker='o', label='Normal')
plt.plot(x_positions, populate_last_response_times, marker='^', label='Populate')
plt.plot(x_positions, lookup_last_response_times, marker='s', label='Lookup')
plt.legend()

# Customize the plot
plt.xlabel("Query percentage", fontweight='bold')
plt.ylabel("Average Response Time (ms)")
plt.title("Average Response Time for Different Number of Queried Data")
plt.xticks(x_positions, x_labels_percent, rotation=45, ha="right")  # Rotate labels for better readability
plt.tight_layout()  # Adjust layout to prevent labels from overlapping

plt.show()

bar_width = 0.2

# X positions for the bars
r1 = np.arange(len(normal_last_response_times))
r2 = [x + bar_width for x in r1]
r3 = [x + bar_width for x in r2]

# Create the bar plot
plt.figure(figsize=(12, 7))

plt.bar(r1, normal_last_response_times, color='blue', width=bar_width, edgecolor='grey', label='Normal')
plt.bar(r2, populate_last_response_times, color='green', width=bar_width, edgecolor='grey', label='Populate')
plt.bar(r3, lookup_last_response_times, color='red', width=bar_width, edgecolor='grey', label='Lookup')

# Add xticks on the middle of the group bars
plt.xlabel('Number of queried data', fontweight='bold')
plt.xticks([r + bar_width for r in range(len(normal_last_response_times))],
           x_labels_numbers, rotation=45, ha="right")

# Create legend & Show graphic
plt.ylabel("Average Response Time (ms)")
plt.title("Average Response Time for Different File Sizes")
plt.legend()
plt.tight_layout()
plt.show()

# Stacked bar plot
plt.figure(figsize=(12, 7))

# Convert lists to numpy arrays to handle potential None values
normal_values = np.array(normal_last_response_times)
populate_values = np.array(populate_last_response_times)
lookup_values = np.array(lookup_last_response_times)

# Replace None values with 0 for plotting
normal_values = np.nan_to_num(normal_values)
populate_values = np.nan_to_num(populate_values)
lookup_values = np.nan_to_num(lookup_values)

# Create horizontal stacked bar plot
plt.barh(x_labels_numbers, normal_values, color='blue', label='Normal')
plt.barh(x_labels_numbers, populate_values, left=normal_values, color='green', label='Populate')
plt.barh(x_labels_numbers, lookup_values, left=normal_values + populate_values, color='red', label='Lookup')

# Add labels and title
plt.ylabel('Number of queried data', fontweight='bold')
plt.xlabel("Average Response Time (ms)")
plt.title("Stacked Average Response Time for Different File Sizes")
plt.yticks(rotation=45, ha="right")

# Add legend & Show graphic
plt.legend()
plt.tight_layout()
plt.show()

# Scatter plot
plt.figure(figsize=(8, 6))
plt.scatter(normal_values, populate_values, color='purple', label='Normal vs Populate')
plt.scatter(normal_values, lookup_values, color='orange', label='Normal vs Lookup')

# Add labels and title
plt.xlabel('Normal Average Response Time (ms)')
plt.ylabel('Other Average Response Time (ms)')
plt.title('Scatter Plot of Average Response Times')
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()
