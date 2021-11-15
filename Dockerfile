FROM tbcp/nodejs:debian

USER bootcamp

WORKDIR /home/bootcamp/

RUN sudo yarn global add \
    webpack \
    webpack-cli \
    webpack-bundle-analyzer \
    typescript \
    cross-env \
    concurrently \
    rimraf \
    --prefix /usr/local

RUN sudo yarn global add \
    docsify-cli@latest \
    --prefix /usr/local

COPY ./package.json /home/bootcamp/

RUN yarn install

COPY . /home/bootcamp/

CMD [ "docsify", "serve", "." ]

# docker-build:
#   # Official docker image.
#   image: docker:latest
#   stage: Environment
#   services:
#     - docker:dind
#   before_script:
#     - echo $CI_DOCKERHUB_PASSWORD | docker login -u "$CI_DOCKERHUB_USER" --password-stdin $CI_DOCKERHUB_REGISTRY
#   script:
#     - docker build --pull -t "index.docker.io/tbcp/webapp:latest" .
#     - docker push "index.docker.io/tbcp/webapp:latest"
#   only:
#     - main
#   allow_failure: true
