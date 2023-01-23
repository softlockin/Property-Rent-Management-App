FROM python:3.10-slim-buster

COPY . /app
WORKDIR /app

RUN apt update
RUN apt-get install cron -y

RUN mkdir /cron
RUN touch /cron/django_cron.log

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get install libpq-dev gcc -y
RUN pip install -r requirements.txt

EXPOSE 8000

CMD service cron start && python manage.py runserver 0.0.0.0:8000