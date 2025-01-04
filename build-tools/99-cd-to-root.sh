#!/bin/bash

# navigate to the root directory, no matter where the script is called


# Define a file or directory that exists in your project root
ROOT_MARKER=".git"  # For example, if it's a git repository

# Function to find the project root
find_project_root() {
    local current_dir="$PWD"
    while [[ "$current_dir" != "/" ]]; do
        if [[ -d "$current_dir/$ROOT_MARKER" ]]; then
            echo "$current_dir"
            return 0
        fi
        current_dir="$(dirname "$current_dir")"
    done
    return 1
}

# Find and change to the project root
navigate_to_root_dir() {
  project_root=$(find_project_root)
  if [[ -n "$project_root" ]]; then
      cd "$project_root" || exit 1
      # echo "Changed to project root: $project_root"
  else
      echo "Error: Could not find project root" >&2
      exit 1
  fi
}

navigate_to_root_dir
