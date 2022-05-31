FROM python:3.9

ADD . /app
WORKDIR /app
RUN pip install --no-cache-dir -U pip
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE $PORT
ENV PORT=$PORT
CMD ["prisma", "generate"]
CMD ["python", "main.py"]