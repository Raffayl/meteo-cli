const readline = require('readline'); // Pour interagir avec l'utilisateur dans le terminal
const axios = require('axios'); // Pour effectuer des requêtes HTTP

// Clé API OpenWeatherMap
const API_KEY = '1840c74e8c1419f107e336e09906c447';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Configuration pour demander une entrée utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Fonction pour récupérer la météo d'une ville
const getWeather = async (city) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city, // Nom de la ville
                appid: API_KEY, // Clé API
                units: 'metric', // Unités métriques (Celsius)
            },
        });

        const { main, weather, name } = response.data;
        console.log(`\n🌍 Ville : ${name}`);
        console.log(`🌡️ Température : ${main.temp}°C`);
        console.log(`☁️ Condition : ${weather[0].description}`);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error('\n❌ Ville introuvable. Vérifiez le nom.');
        } else if (error.response && error.response.status === 401) {
            console.error('\n❌ Clé API invalide ou non autorisée.');
        } else {
            console.error('\n❌ Une erreur est survenue :', error.message);
        }
    }
};

// Fonction principale pour lancer le programme
const startApp = () => {
    console.log('\n🌤️ Bienvenue dans l\'appli météo CLI 🌤️');
    rl.question('👉 Entrez le nom d\'une ville : ', async (city) => {
        await getWeather(city.trim());
        rl.close();
    });
};

// Lancer le programme
startApp();
