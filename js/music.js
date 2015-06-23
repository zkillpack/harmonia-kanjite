/**
 * Created by Dakota on 5/18/2015.
 */

Game.Music = {
    synth: new Tone.MonoSynth(),
    tremolo: 5,
    droneFilter: new Tone.Filter({
        "type": "highpass",
        "frequency": 200
    }),
    bassFilter: new Tone.Filter({
        "type": "lowpass",
        "frequency": 100
    }),
    droneLFO: new Tone.LFO(5, -5, 5),
    drone: new Tone.Oscillator(55, "square"),
    bass: new Tone.Oscillator(110, "square"),

    init: function () {
        this.droneLFO.start();


        //this.droneLFO.connect(this.drone.detune);

        this.drone.connect(this.droneFilter);
        this.droneFilter.toMaster();
        this.drone.start();


        this.bass.connect(this.bassFilter);
        this.bassFilter.toMaster();
        this.bass.start();
    }

};


