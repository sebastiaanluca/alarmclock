#!/bin/bash

(
  for i in {0..100..5}; do
    amixer -c 0 sset 'Headphone' $i% > /dev/null
    sleep 3
  done
) &
