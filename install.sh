#!/bin/bash

printf "\n------------ Installing Dependencies ----------------\n\n"

npm install;

printf "\n------------ Rebuilding bcrypt package --------------\n\n"

npm rebuild bcrypt --build-from-source;

printf "\n--------- Run (npm run dev) to start server ---------\n\n"