const lowPunch = {
  'low-punch': () => console.log('give a low punch')
}
const midPunch = {
  'mid-punch': () => console.log('give a middle punch')
}
const higPunch = {
  'hig-punch': () => console.log('give a high punch')
}
const lowKick = {
  'low-kick': () => console.log('give a low kick')
}
const midKick = {
  'mid-kick': () => console.log('give a middle kick')
}
const higKick = {
  'hig-kick': () => console.log('give a high kick')
}

const MOVES = {
  'low-punch': lowPunch,
  'mid-punch': midPunch,
  'hig-punch': higPunch,
  'low-kick': lowKick,
  'mid-kick': midKick,
  'hig-kick': higKick,
}

const createFighter = (name, moves = []) => ({
  name, moves
})

const createMoves = (names, moves) => 
  names.reduce( 
    (actions, name) => Object.assign(actions, moves[name])
  , {})

const MOVES_RYU = createMoves([
  'low-punch',
  'mid-punch',
  'hig-punch',
  'low-kick',
  'mid-kick',
  'hig-kick',
], MOVES)

const MOVES_BLANKA = createMoves([
  'low-punch',
  'mid-punch',
  'hig-punch',
  'low-kick',
  'mid-kick',
  'hig-kick',
], MOVES)

const MOVES_BS = createMoves([
  'hig-punch',
  'hig-kick',
], MOVES)

const MOVES_SD = createMoves([
  'mid-punch',
  'mid-kick',
], MOVES)

const Ryu = createFighter('Ryu', MOVES_RYU)
console.log('Ryu: ', Ryu)

const Blanka = createFighter('Blanka', MOVES_BLANKA)
console.log('Blanka: ', Blanka)

const BrainSmasher = createFighter('BrainSmasher', MOVES_BS)
console.log('BrainSmasher: ', BrainSmasher)

const StomachDriller = createFighter('StomachDriller', MOVES_SD)
console.log('StomachDriller: ', StomachDriller)


const FIGHT = (fighters = [Ryu, Blanka]) => {

  const [p1, p2] = fighters
  console.log('player1: ', p1)
  console.log('player2: ', p2)

  console.log('\nFIGHT!!!\n\n')

  setTimeout(() => {

    return console.log(
      '\nVencedor: ',
      fighters[
        Math.round(Math.random())
      ].name
    )
  }, 1000)
}

FIGHT([Ryu, BrainSmasher])
FIGHT([Ryu, Blanka])
FIGHT([Ryu, StomachDriller])