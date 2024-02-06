# Utiliser une image de base Node.js
FROM node:latest

# Créer le répertoire de travail de l'application
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application s'exécute
EXPOSE 8080

# Commande pour exécuter l'application
CMD ["node", "index.js"]


