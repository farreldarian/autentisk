FROM python:3.9

ADD . /app
WORKDIR /app
RUN pip install --no-cache-dir -U pip
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000
CMD ["python", "main.py"]
