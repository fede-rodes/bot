# Node.js server for FB messenger chatbot

## Setup MongoDB provider
Before doing anything, we need to setup a Mongo provider to hold our database for us. I'll describe two ways of doing this; choose the one you like the most.

### Install Mongo locally
The first approach is to install Mongo locally. In order to so, go to [https://docs.mongodb.com/manual/administration/install-community/](https://docs.mongodb.com/manual/administration/install-community/) and follow the instructions based on your operating system. After that, open a new terminal and start the mongo service; in my case, I'm on Ubuntu, so I run ```sudo service mongod start```. This will start the Mongo service in the background on port 27017.

### Get a Sandbox Mongo instance on mLab
The second option is to create a FREE database hosted on mLab and then connect your application to the remote instance. To do so, go to mLab and create a sandbox Mongo instance. Then, go to the Users tab in your mLab-sandbox-MongoDB-instance-dashboard and click on the 'add a database user' button; setup username and password. Remember those values, we'll need them shortly!

## Running the app locally in dev mode
Once we have our Mongo provider, these are the next steps that we need to follow to run the app locally in dev mode:

1. Clone the project and move to the project's folder
```
>> git clone https://github.com/fede-rodes/bot.git
>> cd bot
```

2. Setup your MONGO_URL env variable to connect the app with your recently created Mongo instance. In order to do so, first create a .env file in your root directory by copying the content of the provided .sample.env file. Then, setup the MONGO_URL env variable to connect to your mongoDB instance. In case you are using mLab, remember to use your credentials. In case your are running mongo locally, you can use the default value for MONGO_URL.

3. Install project dependencies, and run the app locally.
```
>> npm install
>> npm start
```
The app should be running and listening on port 3000 --> http://localhost:3000

## Running the app locally in production mode
1. Follow the steps above to setup your Mongo service.

2. Install heroku cli: [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

3. Clone the project and move to the project's folder
```
>> git clone https://github.com/fede-rodes/bot.git
>> cd bot
```

4. Setup your MONGO_URL env variable as describe above.

5. Install dependencies and run the app locally in production mode.
```
>> npm install
>> heroku local
```
This should launch the app on port 5000 --> http://localhost:5000. As far as I understand, the port is setup by heroku and can't be changed.

## Deploy to heroku
1. Follow the steps above to setup a Mongo service on mLab.

2. Install heroku cli: [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)

3. Clone the project and move to the project's folder
```
>> git clone https://github.com/fede-rodes/bot.git
>> cd bot
```

4. Initiate Heroku cli and create a new app
```
>> heroku login (enter your credentials)
>> heroku create <YOUR_APP_NAME>
```

5. Install buildpacks (probably not necessary if you don't use yarn) and set MONGO_URL env variable.
```
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#yarn
heroku config:set MONGO_URL=mongodb://<dbuser>:<dbpassword>@<something>.mlab.com:<port>/<dbname>
```

6. Push the code to Heroku.
```
>> git push heroku master
```

## Ngrok for development purposes
1. Install ngrok from [https://dashboard.ngrok.com/get-started](https://dashboard.ngrok.com/get-started)

2. Open a new terminal, move to where you executable ngrok file is located and start a tunnel.
```
>> ./ngrok http 80
```
