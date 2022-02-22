FROM node:12.18.3
WORKDIR /

RUN git clone https://github.com/DanielPickens/Mapty

# Change directories into what got checked out.
WORKDIR /Mapty
# All of the files are already there, so we only need to
RUN npm install gulp
EXPOSE 8080
CMD ["pm2", "start", "./bin/ww"]
