import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Slider from '../control_components/Slider'
import Knob from '../control_components/Knob'
import ButtonSet from '../control_components/ButtonSet'

export default class ToneSynth extends Component {
  constructor(props) {
    super(props)
  }

  updateNodeParams = () => {
    const { node, settings } = this.props
    const { volume, detune, portamento, envelope, oscillator } = settings
    const { type, phase, harmonicity } = oscillator

    const {
      attack,
      attackCurve,
      decay,
      decayCurve,
      sustain,
      release,
      releaseCurve
    } = envelope

    node.volume.value = volume
    node.detune.value = detune
    node.portamento = portamento

    node.oscillator.type = type
    node.oscillator.phase = phase

    if (node.oscillator.harmonicity) {
      node.oscillator.harmonicity.value = harmonicity
    }

    node.envelope.attack = attack
    node.envelope.attackCurve = attackCurve
    node.envelope.decay = decay
    node.envelope.decayCurve = decayCurve
    node.envelope.sustain = sustain
    node.envelope.release = release
    node.envelope.releaseCurve = releaseCurve
  }

  handlePropertyValueChange = (property, value) => {
    const { id, handlePropertyValueChange } = this.props
    handlePropertyValueChange(id, property, value)
  }

  render() {
    const { name, settings } = this.props
    const { volume, detune, portamento, envelope, oscillator } = settings

    const {
      type,
      // modulationType,
      // partialCount,
      // partials,
      phase,
      harmonicity
    } = oscillator

    // Type
    // The type of the oscillator. Can be any of the basic types: sine, square, triangle, sawtooth. Or prefix the basic types with "fm", "am", or "fat" to use the FMOscillator, AMOscillator or FatOscillator types. The oscillator could also be set to "pwm" or "pulse". All of the parameters of the oscillator's class are accessible when the oscillator is set to that type, but throws an error when it's not.
    // type OmniOscillatorType = "fatsine" | "fatsquare" | "fatsawtooth" | "fattriangle" | "fatcustom" | FatTypeWithPartials | "fmsine" | "fmsquare" | "fmsawtooth" | "fmtriangle" | "fmcustom" | FMTypeWithPartials | "amsine" | "amsquare" | "amsawtooth" | "amtriangle" | "amcustom" | AMTypeWithPartials | TypeWithPartials | OscillatorType | "pulse" | "pwm"

    // Modulation Type
    // The type of the modulator oscillator. Only if the oscillator is set to "am" or "fm" types. See AMOscillator or FMOscillator

    const {
      attack,
      attackCurve,
      decay,
      decayCurve,
      sustain,
      release,
      releaseCurve
    } = envelope

    const oscillatorTypes = [
      'fatsine',
      'fatsquare',
      'fatsawtooth',
      'fattriangle',
      'fmsine',
      'fmsquare',
      'fmsawtooth',
      'fmtriangle',
      'amsine',
      'amsquare',
      'amsawtooth',
      'amtriangle',
      'pulse',
      'pwm'
    ]

    const envelopeCurves = [
      'linear',
      'exponential',
      'sine',
      'cosine',
      'bounce',
      'ripple',
      'step'
    ]

    const decayEnvelopeCurves = ['linear', 'exponential']

    this.updateNodeParams()

    return (
      <div className="ToneSynth">
        <h1>{name}</h1>

        <Slider
          name="Volume"
          property={['volume']}
          min={-20}
          max={10}
          step={0.01}
          value={volume}
          handleChange={this.handlePropertyValueChange}
        />

        <Knob
          name="Detune"
          property={['detune']}
          min={-100}
          max={100}
          value={detune}
          handleChange={this.handlePropertyValueChange}
        />

        <Slider
          name="Portamento"
          property={['portamento']}
          min={0}
          max={1}
          step={0.1}
          value={portamento}
          handleChange={this.handlePropertyValueChange}
        />

        <h2>Oscillator</h2>

        <ButtonSet
          name="Type"
          property={['oscillator', 'type']}
          value={type}
          options={oscillatorTypes}
          handleChange={this.handlePropertyValueChange}
        />

        <Slider
          name="Phase"
          property={['oscillator', 'phase']}
          min={0}
          max={360}
          step={1}
          value={phase}
          handleChange={this.handlePropertyValueChange}
        />

        <Slider
          name="Harmonicity"
          property={['oscillator', 'harmonicity']}
          min={0}
          max={7}
          step={0.01}
          value={harmonicity}
          handleChange={this.handlePropertyValueChange}
        />

        <h2>Envelope</h2>

        <Slider
          name="Attack"
          property={['envelope', 'attack']}
          min={0}
          max={1}
          step={0.01}
          value={attack}
          handleChange={this.handlePropertyValueChange}
        />

        <ButtonSet
          name="Attack Curve"
          property={['envelope', 'attackCurve']}
          value={attackCurve}
          options={envelopeCurves}
          handleChange={this.handlePropertyValueChange}
        />

        <Slider
          name="Decay"
          property={['envelope', 'decay']}
          min={0}
          max={1}
          step={0.01}
          value={decay}
          handleChange={this.handlePropertyValueChange}
        />

        <ButtonSet
          name="Decay Curve"
          property={['envelope', 'decayCurve']}
          value={decayCurve}
          options={decayEnvelopeCurves}
          handleChange={this.handlePropertyValueChange}
        />

        <Slider
          name="Sustain"
          property={['envelope', 'sustain']}
          min={0}
          max={1}
          step={0.01}
          value={sustain}
          handleChange={this.handlePropertyValueChange}
        />

        <Slider
          name="Release"
          property={['envelope', 'release']}
          min={0}
          max={1}
          step={0.01}
          value={release}
          handleChange={this.handlePropertyValueChange}
        />

        <ButtonSet
          name="Release Curve"
          property={['envelope', 'releaseCurve']}
          value={releaseCurve}
          options={envelopeCurves}
          handleChange={this.handlePropertyValueChange}
        />
      </div>
    )
  }
}

ToneSynth.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  node: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  handlePropertyValueChange: PropTypes.func.isRequired
}
