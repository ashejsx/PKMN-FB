class Pokemon {
    constructor(name, hp, maxHp, type, moves) {
        this.name = name;
        this.hp = hp;
        this.maxHp = maxHp;
        this.type = type;
        this.moves = moves;
    }
}

class Boss extends Pokemon {
    constructor(name, hp, maxHp, type, moves,difficulty) {
        super(name,hp,maxHp,type,moves);
        this.difficulty = difficulty;
    }
}

const blaziken = new Pokemon(
    "Blaziken", 
    100, 
    100, 
    "Fire/Fighting", 
    [
        { name: "Flamethrower", power: 25, accuracy: 0.9, critChance: 0.1},
        { name: "Double Kick", power: 15, accuracy: 1.0, critChance: 0.2}
    ])

const kyogre = new Boss(
    "Kyogre", 
    100, 
    100, 
    "Water", 
    [
        { name: "Hydro Pump", power: 30, accuracy: 0.8, critChance: 0.1},
        { name: "Surf", power: 20, accuracy: 1.0, critChance: 0.15}
    ],
    "easy")