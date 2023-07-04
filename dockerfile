FROM node

RUN apt update -yq
RUN apt install libreoffice -yq
RUN apt install zsh -yq
RUN apt install curl -yq

RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

RUN touch ~/.zshrc

RUN npm install -g pnpm

VOLUME ~/pdf-service

WORKDIR ~

EXPOSE 3333

