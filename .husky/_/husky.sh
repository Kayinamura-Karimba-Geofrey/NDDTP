#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  husky_skip_init=1
  export husky_skip_init
  if [ -f "$0" ]; then
    . "$(dirname "$0")/husky.sh"
  fi
fi
