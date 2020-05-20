
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
cd tasify
```
3. Run the install script `install.sh`
```
bash ./install.sh
```
4. To start the server run:
```
npm run dev 
```

> open <http://localhost:3000> in browser.

### Possible Errors and its solutions
If get any `error` in running `install.sh`,  example : 
```
permission denied: ./install.sh
```
change the permission to execute the bash script, run
```
chmod 0700 install.sh
```
