# Dashboard
This is the dashboard for health care professionals to view patients' submitted data.
Dashboard is built using [React](https://reactjs.org/).

## Getting started
Install nodeJS and the node modules required for React and Webpack.
Get into Dashboard folder, and run this command to install all dependencies.
```
npm install
```
If you open 'package.json' file, you will find all dependencies we need.


## Known installation issue
Make sure that the node web pack module is installed. In case the npm install command did not install webpack ypu can install it manually using the following command (-g for global).
``` sudo npm i webpack ```  OR  ``` sudo npm i -g webpack ``` 


## Run the dashboard within Django using Webpack:
We use [Webpack](https://webpack.js.org/) as module bundler. To run the Dashboard within Django, you need to create a bundle for Django to find React:

In the dashboard directory, run
```
webpack --config webpack.config.js
```

Webpack will help us build a bundle for Django. If you make some changes in your code, make sure to re-generate a bundle using the above command. Then, just run Django using
```
python manage.py runserver
```
Go to http://localhost:8000/dashboard, you will see the dashboard running.

## Progress so far
Features implemented:
* Login & logout
* Only staff can login, patient's credential is not valid at Dashboard.
* All patients page & individual patient's page
* Creating notes
* Adding patient
* Adding doctor
* Adding hospital
Features to be added
