# Dashboard
This is the dashboard for health care professionals to view patient submitted data.

## Getting started 
install node and modules required for webpack.
Install all modules
```
npm install
```

Build npm
```
npm run build
```


## Run the dasboard using npm:
In the dashboard directory, run

```
npm start
```

## Run the dashboard within Django using webpack:
First of all, you need to create a bundle for Django to find React:


In the dashboard directory, run
```
webpack --config webpack.config.js
```

Webpack will help us build a bundle for Django. If you make some changes, make
sure to re-generate a bundle using the above command.


