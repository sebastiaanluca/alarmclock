#!/bin/bash

sudo apt-get install curl -y

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get update
sudo apt-get install nodejs -y

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update
sudo apt-get install yarn -y

yarn --version
