#/bin/sh
mkdir ~/mongo-data
mongod --dbpath ~/mongo-data --port 27017 &
npm run dev
