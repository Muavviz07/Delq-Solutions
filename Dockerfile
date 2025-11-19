# ==========================================
# Stage 1: Build the React Frontend
# ==========================================
# Use Node.js image to build the frontend
FROM node:18 as build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy your frontend dependency files
COPY package*.json ./

# Install the frontend dependencies
RUN npm install

# Copy the rest of your code (src, public, etc.)
COPY . .

# Build the React app (this creates the 'build' folder)
RUN npm run build

# ==========================================
# Stage 2: Setup the Python Backend
# ==========================================
# Use Python image for the backend
FROM python:3.10

# Set the working directory inside the container
WORKDIR /app

# Copy your backend dependency file
COPY requirements.txt .

# Install python dependencies
# --no-cache-dir keeps the image smaller
RUN pip install --no-cache-dir -r requirements.txt

# Copy your backend code (main.py, app_data, imgs, etc.)
COPY . .

# Copy the final 'build' folder from Stage 1 into this stage
# This puts the React static files where FastAPI can find them
COPY --from=build-stage /app/build ./build

# Expose the port the app runs on (Render uses 10000 or 8000 usually)
EXPOSE 8000

# The command to start the server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]