import * as Tone from 'tone'
import { generateUniqId } from '../utilities'
import { loadSamples } from './drum_samples_buffer'

const samples = loadSamples()

function generateScale() {
  const keys = []

  for (let step = 0; step < 64; step++) {
    const octave = step < 7 ? 0 : Math.floor(step / 7)
    const position = step < 7 ? step + 1 : step + 1 - octave * 7
    let note

    switch (position) {
      case 1:
        note = `A${octave}`
        break
      case 2:
        note = `B${octave}`
        break
      case 3:
        note = `C${octave}`
        break
      case 4:
        note = `D${octave}`
        break
      case 5:
        note = `E${octave}`
        break
      case 6:
        note = `F${octave}`
        break
      case 7:
        note = `G${octave}`
        break
    }

    keys.push(note)
  }

  return keys
}

function getBufferedSampleUrls() {
  const bufferedSampleUrls = {}
  const scale = generateScale()

  scale.forEach((key, i) => {
    bufferedSampleUrls[key] = samples[i]
  })

  return bufferedSampleUrls
}

const samplerSettings = {
  volume: 1,
  attack: 0,
  release: 0,
  curve: 'linear',
  urls: getBufferedSampleUrls(),
  baseUrl: 'http://localhost:3000'
}

const freeverbSettings = {
  wet: 0.9,
  roomSize: 0.08,
  dampening: 40
}

const channelSettings = {
  volume: -6,
  pan: 0,
  mute: false,
  solo: false
}

const samplerNode = new Tone.Sampler(samplerSettings)
const freeverbNode = new Tone.Freeverb(freeverbSettings)
const channelNode = new Tone.Channel(channelSettings).toDestination()
samplerNode.chain(freeverbNode, channelNode)

const v = 1
const d = '4n'

const partSettings = {
  scale: generateScale(),
  sequence: [
    {
      time: '0:0:0',
      noteName: 'A1',
      duration: d,
      velocity: v
    },
    {
      time: '0:1:0',
      noteName: 'A1',
      duration: d,
      velocity: v
    },
    {
      time: '0:2:0',
      noteName: 'A1',
      duration: d,
      velocity: v
    },
    {
      time: '0:3:0',
      noteName: 'A1',
      duration: d,
      velocity: v
    },
    {
      time: '1:0:0',
      noteName: 'A1',
      duration: d,
      velocity: v
    },
    {
      time: '1:1:0',
      noteName: 'A1',
      duration: d,
      velocity: v
    },
    {
      time: '1:2:0',
      noteName: 'A1',
      duration: d,
      velocity: v
    },
    {
      time: '1:3:0',
      noteName: 'A1',
      duration: d,
      velocity: v
    }
  ]
}

const partNode = new Tone.Part(function (time, note) {
  samplerNode.triggerAttackRelease(
    note.noteName,
    note.duration,
    time,
    note.velocity
  )
}, [])

partNode.loopEnd = '2m'
partNode.loop = true

const instrument = [
  {
    id: generateUniqId(),
    name: 'Sequencer',
    type: 'Sequencer',
    node: partNode,
    settings: partSettings
  },
  {
    id: generateUniqId(),
    name: 'Drum Sampler',
    type: 'Sampler',
    node: samplerNode,
    settings: samplerSettings
  },
  {
    id: generateUniqId(),
    name: 'Freeverb',
    type: 'FreeverbEffect',
    node: freeverbNode,
    settings: freeverbSettings
  },
  {
    id: generateUniqId(),
    name: 'Channel',
    type: 'Channel',
    node: channelNode,
    settings: channelSettings
  }
]

export { instrument }
