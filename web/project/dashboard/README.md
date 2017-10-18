# Dashboard
This is the dashboard built for the cancer project

## How to run it using npm:
In the dashboard directory, run

```
npm start
```

## How to run it within Django:
First of all, you need to create a bundle for Django to find React:
In the dashboard directory, run

```
webpack --config webpack.config.js
```

Webpack will help us build a bundle for Django. If you make some changes, make
sure to re-generate a bundle using the above command.

## Done
Hook React into Django

Initial Dashboard design implementation
* Dashboard overview page
* My patients page
* Add patients page
* Login page
* Register page

## Ongoing
Patient detail page

Send Ajax request to Django backend: need to figure out how these api works

Some bugs need to be fixed

Bootstrap configuration
