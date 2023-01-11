FROM node:14
ARG API_URL
ARG CLIENT_AUTH_TOKEN
WORKDIR /usr/src/app

COPY . ./
 
RUN npm install -g npm 
RUN  ssh-add -l
RUN npm install --global yarn
RUN npm install
RUN yarn config set "strict-ssl" false
RUN yarn build

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080
ENV API_URL=${API_URL}
ENV CLIENT_AUTH_TOKEN=${CLIENT_AUTH_TOKEN}

RUN npm run build

CMD [ "yarn", "start"  ]