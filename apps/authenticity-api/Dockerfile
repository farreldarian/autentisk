FROM --platform=linux/amd64 python:3.9
RUN apk update
ADD . /app
WORKDIR /app
RUN pip install --no-cache-dir -U pip
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE $PORT
ENV PORT=$PORT
RUN ["prisma", "generate"]
CMD ["python", "main.py"]