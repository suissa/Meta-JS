const MOVES = {
  'low-punch': {
    'low-punch': () => console.log('give a low punch')
  },
  'mid-punch': {
    'mid-punch': () => console.log('give a middle punch')
  },
  'hig-punch': {
    'hig-punch': () => console.log('give a high punch')
  },
  'low-kick': {
    'low-kick': () => console.log('give a low kick')
  },
  'mid-kick': {
    'mid-kick': () => console.log('give a middle kick')
  },
  'hig-kick': {
    'hig-kick': () => console.log('give a high kick')
  },
}

const createFighter = (name, moves = []) => ({
  name, moves
})

const MOVES_RYU = [
  'low-punch',
  'mid-punch',
  'hig-punch',
  'low-kick',
  'mid-kick',
  'hig-kick',
]

const MOVES_BLANKA = [
  'low-punch',
  'mid-punch',
  'hig-punch',
  'low-kick',
  'mid-kick',
  'hig-kick',
]

const MOVES_BS = [
  'hig-punch',
  'hig-kick',
]

const MOVES_SD = [
  'mid-punch',
  'mid-kick',
]
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