[![Known Vulnerabilities](https://snyk.io/test/github/fliptask/fliptask-api/badge.svg)](https://snyk.io/test/github/fliptask/fliptask-api)

# FlipTask (Task Management)

### Prerequisite
You have to install following dependencies to start:

- `MongoDB`
- `Node.js` version >= 10.x

### After installing all the prerequisite:

Steps to follow

1.  Clone Fliptask-API
2.  Change the current directory to `fliptask-api`.
```
cd fliptask-api
```
3. Copy `.env.example` as `.env`, make required changes.

4. Run the install script `install.sh`
```
bash ./install.sh
```
5. To start the server run:
```
npm run dev 
```

### Possible Errors and its solutions
If get any `error` in running `install.sh`,  example : 
```
permission denied: ./install.sh
```
change the permission to execute the bash script, run
```
chmod 0700 install.sh
```
