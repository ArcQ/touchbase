## Django Rest Framework backed

This folder contains the backend. You will notice that I have three lines commented out in the root `settings.py` file. That's because I was experimenting
with `HttpOnly` cookie but forgot to exclude it from the repo. Those lines are not needed for this tutorial.

Once you pull in the repository, make sure to create a `secrets.py` file inside the Django project folder and supply it with the necessary keys and values as shown
in `secrets.example.py`. Then, make migrations and create a superuser.
You also need to set up the social application in Django Admin panel with the OAuth provider's `client_id` and `client_secret`.

###Deploy
To deploy run
```
. ./scripts/build_deploy.sh
```
in the root django folder.

when you make migrations migrate firebase first, otherwise you're going to have to go into the dependencies and remove all the migrations in there (django stores them in there and restframework.authtoken and admin need cu
stom models to be applied first)
