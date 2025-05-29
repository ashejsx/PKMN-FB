//Pokemon Creation//
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
//Pokemon Creation//
//
//
//
//
//Execute Moves//
function performMove(attacker, defender, move) {
    console.log(`${attacker} used ${move.name}!`)

    //Accuracy Check
    if (Math.random() > move.accuracy) {
        console.log("Missed!");
        return;
    }

    //Crit check
    const isCrit = Math.random() < move.critChance;
    const damage = isCrit ? move.power * 1.5 : move.power;
    defender.hp = defender.hp - damage;

    //Log move
    console.log(isCrit ? "It's a critical hit!" : "")
    console.log(`${defender.name} has ${defender.hp}/${defender.maxHp} HP remaining.`)

}