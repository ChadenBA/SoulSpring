# Dockerfile.python
FROM python:3.14.0rc1-slim
WORKDIR /app
COPY ai_models/requirements.txt ./
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
