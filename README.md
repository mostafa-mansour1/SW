# SW Peoples (Express NodeJs Server)

This project is an Express NodeJs Server ,
A REST API that feeds the data to a frontend
and a ReactJS application to serve the data

## Demo

open the url to check live demo version of the app (http://ec2-44-204-149-160.compute-1.amazonaws.com:9080)

## Init

- Run `git clone https://github.com/mostafa-mansour1/SW.git`
- Run `cd server && npm install && cd ../` to install nodeJs dependencies.
- Run `cd front && npm install && cd ../` to install reactJs dependencies.

## Build

- Run `cd server && npm run build && cd ../` to build the nodeJs .
  - The build artifacts will be stored in the `server/dist/` directory.
- Run `cd front && npm run build && cd ../` to build the project.
  - The build artifacts will be stored in the `server/dist/build` directory.

## Run

- (optional) edit `.env` to change the port
- Run `node server/dist/index.js`

## endpoints

- `/people?page=x` show all people depend on the page number
- `/people?id=x` show one people depend on the id
- `/` show the running website

## Further help

For inquiries kindly contact me at 00971 52 4988466 , mostafa@outlook.kr
