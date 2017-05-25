<h3> Requirements </h3>
<p> Must have Django framework installed. </p>
<a target="_blank" href="https://www.djangoproject.com/start/"> Install Django </a>

<p> Must have Python 2.7 installed. Create a virtual env for this project if you use python 3 for other projects.</p>
<p> You shoul dbe able to install all dependencies with pip. Install pip and run the following command from "hlthpal/web/"
directory. </p>
<p>"pip install -r requirements.txt" in your shell.</p>
<hr/>

<h3> Project setup </h3>
<p> Clone the repo using the git clone command </p>

<p> Run Django application using the following commands </p>
<p> "cd web/project"</p> 
<p> "python manage.py runserver"</p>

<hr/>

<p> If you plan to connect your application to a database you must configure your database first.</p>

<p>
<a target="_blank" href="https://www.digitalocean.com/community/tutorials/sqlite-vs-mysql-vs-postgresql-a-comparison-of-relational-database-management-systems"> Read more about different database options</a>
</p>


<p>
<a target="_blank" href="https://docs.djangoproject.com/en/1.10/topics/install/#database-installation" > Django database support </a>
</p>

<hr/>

<h3 style="text-align: center;" > REST APIs </h3>
<p> Here is a brief description of the supported APIs. You can test the APIs using your browser or using commandline if you have curl installed.</p>

<h4> _________ POST 'api/register' _________</h4>
<p> Register a new user. </p>
<p> URL: http://127.0.0.1:8000/api/register </p>
<p> curl -i -X POST -H "Content-Type: application/json" -d '{"first_name":"John","last_name":"John","email":"john@gmail.com","username":"John10","password":"testPassword"}' http://127.0.0.1:8000/api/register</p>


<h4> _________ POST 'api/auth' _________</h4>
<p> Get authentication token for a given user with username. </p>
<p> URL: http://127.0.0.1:8000/api/auth </p>
<p> curl -i -X POST -H "Content-Type: application/json" -d '{"username":"John","password":"testPassword"}' http://127.0.0.1:8000/api/auth/</p>


<h4> _________ POST 'api/login' _________</h4>
<p> Get authentication token for a given user with email or username. Can be used instead of 'api/auth' </p>
<p> URL: http://127.0.0.1:8000/api/login </p>
<p> curl -i -X POST -H "Content-Type: application/json" -d '{"email":"john@gmail.com","password":"testPassword"}' http://127.0.0.1:8000/api/login/</p>
<p> curl -i -X POST -H "Content-Type: application/json" -d '{"username":"John_21","password":"testPassword"}' http://127.0.0.1:8000/api/login/</p>


<h4> _________ POST 'api/token-refresh' _________</h4>
<p> Refresh authentication token for particular user. </p>
<p> URL: http://127.0.0.1:8000/api/token-refresh </p>
<p> curl -i -H "Authorization: JWT __YOUR_TOKEN__" http://127.0.0.1:8000/api/token-refresh </p>


<h4> _________ GET 'api/symptoms/get' _________</h4>
<p> Get symptoms for a particular user. </p>
<p> URL: http://127.0.0.1:8000/api/symptoms/get </p>
<p> curl -i -X GET -H "Authorization: JWT --token--"  http://127.0.0.1:8000/api/symptoms/get </p>


<h4>_________ POST 'api/symptoms/post' _________</h4>
<p> Submit symptoms for a particular user. </p>
<p> URL: http://127.0.0.1:8000/api/symptoms/post </p>
<p> curl -i -X POST -H "Content-Type: application/json" -d '{"s1":"Domino ", "s2":"Nice day", "s3":"Dude"}' -H "Authorization: JWT --token--"  http://127.0.0.1:8000/api/symptoms/post </p>

<hr/>

<h3 style="text-align: center;" > Project URLs </h3>

<h4> _________ '/home' _________</h4>
<p> Project homepage. </p>
<p> URL: http://127.0.0.1:8000/home </p>


<h4> _________ '/password-reset' _________</h4>
<p> Password reset link. </p>
<p> URL: http://127.0.0.1:8000/password-reset/ </p>
