#!/bin/sh
set -eu
project_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
exec python3 -m http.server "${PORT:-8000}" --bind 127.0.0.1 --directory "$project_dir"
