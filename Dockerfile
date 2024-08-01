FROM public.ecr.aws/docker/library/node:16

WORKDIR /app

COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

# Install runtime dependecies (without dev/test dependecies)
RUN npm ci

RUN npm install pm2 -g

RUN npm run build

# Copy production build
COPY . .

EXPOSE 3000

CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
