const axios = require('axios');
const { addOrUpdateCharacter } = require('./dynamo');

const seedData = async () => {
    const url = 'http://hp-api.herokuapp.com/api/characters';
    try {
        const { data: characters } = await axios.get(url);

        // Ensure addOrUpdateCharacter function is implemented correctly
        const characterPromises = characters.map(async (character, i) => {
            try {
                await addOrUpdateCharacter({ ...character, id: i.toString() });
                console.log(`Character ${i} added/updated successfully.`);
            } catch (err) {
                console.error(`Error adding/updating character ${i}:`, err);
            }
        });

        await Promise.all(characterPromises);
    } catch (err) {
        console.error('Error fetching characters:', err);
        console.log('AHHHHHHHHHHH');
    }
};

seedData();
