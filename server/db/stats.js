const client = require('./client');

//set character starting stats
const startingStats = async({characterId,hp,tempHp, str, dex, con, int, wis, char, ac, speed}) =>
{
    const SQL =`
        INSERT INTO stats("characterId", hp, "tempHP", str, dex, con, int, wis, char, ac, speed)
        Values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
    `;
    
    const {rows} = await client.query(SQL,[characterId,hp,tempHp, str, dex, con, int, wis, char, ac, speed]);
    delete rows[0].characterId
    return rows[0];
}

//update character stats

module.exports={
    startingStats
};