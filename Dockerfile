RUN apt-get update -yq \
    && apt-get -yq install curl gnupg && \
    && curl -sL https://deb.nodesource.com/setup_12.x | bash \
    && apt-get update -yq \
    && apt-get install -yq \
        dh-autoreconf=19 \
        ruby=1:2.5.* \
        ruby-dev=1:2.5.* \
        nodejs \
    && rm -rf /var/lib/apt/lists/*
