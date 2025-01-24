const readline = require('readline');
const axios = require('axios');

const API_KEY = '1840c74e8c1419f107e336e09906c447'; // Ta clé API
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const BASE_URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Fonction pour la météo actuelle
const getWeather = async (city) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
            },
        });

        const { main, weather, name } = response.data;
        console.log(`\n🌍 Ville : ${name}`);
        console.log(`🌡️ Température : ${main.temp}°C`);
        console.log(`☁️ Condition : ${weather[0].description}`);
    } catch (error) {
        console.error('\n❌ Erreur : Impossible de récupérer les données météo.');
    }
};

// Fonction pour les prévisions météo
const getWeatherForecast = async (city) => {
    try {
        const response = await axios.get(BASE_URL_FORECAST, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
            },
        });

        const forecast = response.data.list;
        console.log(`\n🌤️ Prévisions météo pour ${city} :\n`);

        // Affiche une prévision par jour
        forecast.forEach((item, index) => {
            if (index % 8 === 0) {
                console.log(`📅 ${item.dt_txt} :`);
                console.log(`   🌡️ Température : ${item.main.temp}°C`);
                console.log(`   ☁️ Condition : ${item.weather[0].description}\n`);
            }
        });
    } catch (error) {
        console.error('\n❌ Erreur : Impossible de récupérer les prévisions.');
    }
};

// Fonction principale
const startApp = () => {
    console.log('\n🌤️ Bienvenue dans l\'appli météo CLI 🌤️');
    rl.question('👉 Entrez le nom d\'une ville : ', async (city) => {
        console.log('\nQue souhaitez-vous faire ?');
        console.log('1️⃣ Météo actuelle');
        console.log('2️⃣ Prévisions sur 5 jours');
        rl.question('👉 Choisissez une option (1 ou 2) : ', async (option) => {
            if (option === '1') {
                await getWeather(city.trim());
            } else if (option === '2') {
                await getWeatherForecast(city.trim());
            } else {
                console.log('❌ Option invalide. Veuillez choisir 1 ou 2.');
            }
            rl.close();
        });
    });
};

// Lancer le programme
startApp();
