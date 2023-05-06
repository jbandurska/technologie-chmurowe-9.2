# Użyj obrazu node.js dla architektury arm64
FROM arm64v8/node

# Ustawienie katalogu roboczego
WORKDIR /usr/src/app

# Skopiuj pliki aplikacji do kontenera
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj resztę plików aplikacji do kontenera
COPY . .

# Uruchomienie aplikacji
CMD [ "npm", "start" ]
