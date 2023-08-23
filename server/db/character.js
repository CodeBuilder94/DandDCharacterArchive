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
    const characterId= rows[0].id;
    const langs =await Promise.all(language.map(async (language) => {
        
        const lang = await giveLanguage({characterId,language});
        return lang
    }))

    rows[0].languages = langs;

    return rows[0];

}

const giveLanguage =  async({characterId, language}) =>
{
    const SQL =`
        INSERT INTO languages("characterId", language)
        VALUES ($1, $2) 
        RETURNING *
    `;
        
    const {rows} = await client.query(SQL,[characterId,language]);
    
    return rows[0].language;
}

module.exports={
    createCharacter
};