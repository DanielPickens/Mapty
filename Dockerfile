FROM node:12-slim

LABEL maintainer="Daniel Pickens"


RUN mkdir -p /usr/src/Mapty
COPY . /usr/src/Mapty
RUN cd /usr/src/Mapty && \
  yarn && \
  yarn run build:fast && \
  chmod +x distribution/commands/index.js && \
  ln -s $(pwd)/distribution/commands/index.js /usr/bin/Mapty

ENTRYPOINT ["Mapty", "ci"]
