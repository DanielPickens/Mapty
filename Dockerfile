FROM ubuntu
MAINTAINER Daniel Pickens
RUN apt-get -qq update
RUN apt-get update && apt-get install -y sudo && rm -rf /var/lib/apt/lists/*
RUN apt-get -qq update
RUN apt-get -qq -y install curl
RUN apt-get install make
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN apt-get install -y nodejs
RUN npm install -g jest
RUN npm install -g eslint
RUN npm install -g babel-eslint
