# Favorite Places App 🌍

Ein MERN-Stack-Projekt, bei dem sich Benutzer anmelden und ihre Lieblingsorte auf der ganzen Welt posten können. Diese App verwendet MongoDB, Express, React und Node.js.

## Features ✨

- Benutzerregistrierung und -anmeldung
- Authentifizierung mit JSON Web Token (JWT)
- Hinzufügen, Bearbeiten und Löschen von Lieblingsorten
- Speicherung der Daten in einer MongoDB-Datenbank

## Voraussetzungen 📋

Um die App lokal auszuführen, stelle sicher, dass folgende Software installiert ist:

- [Node.js](https://nodejs.org/) (v12 oder höher)
- [MongoDB](https://www.mongodb.com/)
- Ein [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) Konto oder eine lokale MongoDB-Instanz

## Installation 🚀

1. **Backend-Abhängigkeiten installieren:**

   ```bash
   cd backend
   npm install
   ```

2. **Frontend-Abhängigkeiten installieren:**

   ```bash
   cd frontend
   npm install
   ```

## MongoDB einrichten 🗄️

1. **MongoDB Atlas einrichten:**

   - Erstelle ein MongoDB Atlas-Konto.
   - Erstelle eine neue Cluster-Instanz und speichere den Verbindungs-String (Connection String), der Informationen über Benutzer, Passwort, Cluster und Datenbank enthält.

2. **Umgebungsvariablen konfigurieren:**

   Erstelle eine `.env`-Datei im `server`-Verzeichnis mit folgendem Inhalt:

   ```bash
   DB_USER=dein-db-user
   DB_PASSWORD=dein-db-password
   DB_CLUSTER=dein-db-cluster
   DB_NAME=deine-db-name
   JWT_SECRET=dein-super-geheimes-token
   ```

   - `DB_USER`: Der Benutzername für deinen MongoDB-Zugang.
   - `DB_PASSWORD`: Das Passwort für den Benutzer.
   - `DB_CLUSTER`: Der Name deines MongoDB-Clusters (z.B. `textcluster`).
   - `DB_NAME`: Der Name der Datenbank, die du verwendest.
   - `JWT_SECRET`: Ein geheimer String für die JWT-Authentifizierung.

## Ausführung der App 🏃‍♂️

1. **Backend starten:**

   ```bash
   cd backend
   npm start
   ```

2. **Frontend starten:**

   Öffne ein neues Terminalfenster:

   ```bash
   cd frontend
   npm run dev
   ```

3. **App öffnen:**

   Öffne deinen Browser und gehe zu [http://localhost:5173](http://localhost:5173), um die App zu sehen.

## Technologien 🛠️

- **Frontend**: React(Vite), Axios, TailwindCSS
- **Backend**: Node.js, Express, JWT
- **Datenbank**: MongoDB, Mongoose
