FROM python:3.9-slim-buster

RUN useradd django

EXPOSE $PORT

ENV QCLUSTER_SETTINGS_MODULE=$QCLUSTER_SETTINGS_MODULE \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    ENV_FILE=$ENV_FILE \
    PORT=$PORT
    # MODE=$MODE \

# ARG ENV_FILE
# ENV ENV_FILE ${ENV_FILE}

RUN apt-get update --yes --quiet && apt-get install --yes --quiet --no-install-recommends \
    build-essential libpq-dev gcc\
 && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

COPY ./requirements.txt ./requirements.txt
RUN pip install -r requirements.txt --no-cache-dir

RUN chown django:django /

# Copy the source code of the project into the container.
COPY --chown=django:django . .

USER django

# if we're in api mode, then run the api with uvicorn, if we're in worker mode then run the django-q qcluster with manage.py
CMD uvicorn --env-file=${ENV_FILE} --workers=5 --timeout-keep-alive=10 backend.asgi:application --host=0.0.0.0 --port=$PORT
