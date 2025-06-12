//Displays
const mainScreen = document.getElementById('mainScreen')
document.addEventListener('keydown', clearDisplay)

function clearDisplay() {
    mainScreen.innerHTML = '';
    setTimeout(choosePokemonMenu, 2000)
}

function choosePokemonMenu() {
    mainScreen.classList.replace('bg-rayquaza', 'bg-options')
    mainScreen.classList.replace('m-8', 'm-20')

    const menu = document.createElement('div')
    menu.className = 'bg-slate-700 m-16 w-auto p-4 rounded-2xl"';
    mainScreen.appendChild(menu)
}

function showBattleScreen() {
  document.getElementById("mainScreen").classList.add("hidden");
  document.getElementById("battleScreen").classList.remove("hidden");
}




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

const blaziken = new Pokemon("Blaziken", 100, 100, "Fire/Fighting", 
    [
        {name: "Flamethrower", power: 25, accuracy: 0.9, critChance: 0.1},
        {name: "Double Kick", power: 15, accuracy: 1.0, critChance: 0.2}
    ])

const kyogre = new Boss("Kyogre", 100, 100, "Water", 
    [
        { name: "Hydro Pump", power: 30, accuracy: 0.8, critChance: 0.1},
        { name: "Surf", power: 20, accuracy: 1.0, critChance: 0.15}
    ], "easy")
//Pokemon Creation//
//
//
//Execute Moves//
function performMove(attacker, defender, move) {
    if (!move || typeof move.power !== "number") {
        console.error("Invalid move or move power!");
        return;
    }

    console.log(`${attacker.name} used ${move.name}!`)

    //Accuracy Check
    if (Math.random() > move.accuracy) {
        console.log("Missed!");
        return;
    }

    //Crit check
    const isCrit = Math.random() < move.critChance;
    const damage = isCrit ? move.power * 1.5 : move.power;
    defender.hp = Math.max(0, defender.hp - damage);

    //Log move
    console.log(isCrit ? `It's a critical hit! ${damage} DMG!` : `Normal hit: ${damage} DMG!`)
    console.log(`${defender.name} has ${defender.hp}/${defender.maxHp} HP remaining.`)

}
//Execute Moves//
//
//
//Stats// 
function scaleDifficulty(enemy) {
    if (enemy.difficulty === "medium") {
        enemy.moves.forEach(move => move.power += 5)
    } 
    else if (enemy.difficulty === "hard") {
        enemy.moves.forEach(move => {
            move.power += 5;
            move.critChance += 0.15;
        })
    }
}

scaleDifficulty(kyogre);
//Stats//
//
//
//Battle//
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function playerTurn() {
    const move = blaziken.moves[0]
    performMove(blaziken, kyogre, move);
}

function enemyTurn() {
    const move = kyogre.moves[Math.floor(Math.random() * kyogre.moves.length)]
    performMove(kyogre, blaziken, move);
}

async function startBattle() {

    while (blaziken.hp > 0 && kyogre.hp > 0) {
        playerTurn();
        await delay(1000);
        if (kyogre.hp <= 0) break;

        enemyTurn();
        await delay(1000);
    }

    console.log(blaziken.hp > 0 
        ? `Your ${blaziken.name} has defeated ${kyogre.name}! Victory!`
        : `${kyogre.name} has defeated your ${blaziken.name}... You lose.`)
}

startBattle();