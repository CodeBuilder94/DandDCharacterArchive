const client = require('./client');

//Create character
const createCharacter = async({userId, characterName, language,hp, tempHp, str, dex, con, int, wis, char, ac, speed}) =>
{
    const SQL =`
        INSERT INTO characters("userId", "characterName")
        VALUES ($1, $2) 
        RETURNING *
    `;

    const {rows} = await client.query(SQL,[userId, characterName]);
    
    //giveLanguage();

    return rows[0];

}

const giveLanguage =  async({characterId, language}) =>
{
    const SQL =`
        INSERT INTO languages("characterId", language)
        VALUES ($1, $2) 
        RETURNING *
    `;
}

module.exports={
    createCharacter
};