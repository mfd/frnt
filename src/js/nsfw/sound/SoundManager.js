import Events from '../events/Events';
import EventsManager from '../events/EventsManager';

import VisibilityManager from '../managers/VisibilityManager';

import Sound from './Sound';
import SoundChannel from './SoundChannel';
import SoundBatcher from '../loaders/SoundBatcher';

/**
 * SOUND
 * MANAGER
 *
 * v1.0
 */


class SoundManager {

    constructor({ path = '', preload = false, crossfadeTime = 0.5, sounds = [], verbose = false }) {

        this.path = path;
        this.preload = preload;
        this.crossfadeTime = crossfadeTime;
        this.verbose = verbose;

        this.channels = [];
        this.sounds = {};
        this.key = 'isMuted';

        const { Howl, Howler } = require('howler');

        window.Howl = Howl;
        window.Howler = Howler;

        // create sounds
        for ( let i = 0; i < sounds.length; i++ ) {
            const sound = sounds[i];
            this.add(sound);
        }

        const status = window.localStorage ? JSON.parse(window.localStorage.getItem(this.key)) : false;

        Object.defineProperty(this, 'isMuted', {
            get: () => { 
                return window.isMuted;
            },
            set: ( isMuted ) => {
                window.isMuted = isMuted;

                if ( window.localStorage ) {
                    window.localStorage.setItem(this.key, isMuted);
                }
            },
            enumerable: true,
            configurable: true
        });

        this.isMuted = status;

        if ( this.verbose ) console.log(`%cSoundManager :: isMuted : ${this.isMuted}`, `color:#CCC;`);
        

        /**
         * Preload sounds lib
         * - preloads all urls set in sounds
         */

        if ( preload ) {
            const batcher = new SoundBatcher();
            const keys = Object.keys(this.sounds);

            for ( let i = 0; i < keys.length; i++ ) {
                const key = keys[i];
                const sound = this.sounds[key];

                batcher.addItem(sound.src);
            }

            batcher.start();
        }

        /**
         * Events
         */
        
        EventsManager.on(Events.Sound.MUTE, ::this.handleMute);
        EventsManager.on(Events.Sound.UNMUTE, ::this.handleUnMute);
        EventsManager.on(Events.Sound.TOGGLE_MUTE, ::this.toggleMute);
        EventsManager.on(Events.Sound.PLAY, ::this.handlePlay);
        EventsManager.on(Events.Sound.STOP, ::this.handleStop);
        EventsManager.on(Events.Sound.CROSSFADE, ::this.handleCrossfade);

        /**
         * VisibilityManager
         * - helps to shut down loops when user leaves current browser tab
         */
        VisibilityManager.start();
        VisibilityManager.bind('SoundManager', ::this.handleVisibility);
    }

    handleMute () {
        this.isMuted = true;

        for ( let i = 0; i < this.channels.length; i++ ) {
            this.channels[i].mute();
        }
            
        if ( this.verbose ) console.log(`%cSoundManager :: mute`, `color:#CCC;`); 
    }

    handleUnMute () {
        this.isMuted = false;

        for ( let i = 0; i < this.channels.length; i++ ) {
            this.channels[i].unmute();
        }

        if ( this.verbose ) console.log(`%cSoundManager :: unmute`, `color:#CCC;`);
    }

    toggleMute () {
        if ( this.isMuted ) {
            this.handleUnMute();
        } else {
            this.handleMute();
        }
    }

    handlePlay ( id ) {
        const sound = this.sounds[id];

        if ( !sound ) {
            console.warn(`Available sounds`, this.sounds);
            throw new Error(`SoundManager :: Sound ${id} not found.`);
        }

        if ( sound ) {
            const channel = this.findAvailableChannel();
            channel.play(sound, this.isMuted);

            return channel;
        }
    }

    handleStop ( id ) {
        if ( !id || id === '' ) return;

        if ( this.verbose ) console.log(`%cSoundManager :: stop ${id}`, `color:#CCC;`);

        for ( let i = 0; i < this.channels.length; i++ ) {
            if ( this.channels[i].id === id ) {
                this.channels[i].stop();
            }
        }
    }

    handleCrossfade ( ids ) {
        const [ id1, id2 ] = ids;

        this.update(id2, { volume: 0 });
        
        const channelOut = this.findChannel(id1);
        const channelIn = this.handlePlay(id2);

        if ( channelOut ) {
            channelOut.fade(0, this.crossfadeTime);
        }

        if ( channelIn ) {
            channelIn.fade(this.sounds[id2].volume, this.crossfadeTime);
        }
    }

    findAvailableChannel () {
        // get an existing and available player
        for ( let i = 0; i < this.channels.length; i++ ) {
            const channel = this.channels[i];

            if ( !channel.isPlaying ) {
                console.log('SoundManager :: findAvailableChannel', this.channels);
                return channel;
            }
        }

        const channel = new SoundChannel();
        this.channels.push(channel);

        console.log('SoundManager :: findAvailableChannel', this.channels);

        return channel;
    }

    findChannel ( id ) {
        for ( let i = 0; i < this.channels.length; i++ ) {
            if ( this.channels[i].id === id ) {
                return this.channels[i];
            }
        }

        return false;
    }

    add ( sound = {} ) {
        if ( this.sounds[sound.id] ) {
            console.warn(`SoundManager :: sound ${sound.id} already exists and is going to be overwritten.`);
        }

        this.sounds[sound.id] = new Sound({
            ...sound,
            src: `${this.path}/${sound.src}`,
        });
    }

    update ( id = '', options = {} ) {
        if ( this.sounds[id] ) {
            const { src, volume, loop } = options;

            if ( src ) this.sounds[id].src = src;
            if ( volume ) this.sounds[id].volume = volume;
            if ( loop ) this.sounds[id].loop = loop;
        } else {
            this.add({ id, ...options});
        }
    }

    /**
     * Visibility
     */
    handleVisibility ( isVisible ) {
        // document.hidden is true on load, so it tries to mute on start 🤔
        if ( this.isMuted ) {
            return;
        }

        // if ( isVisible ) {
        //     this.handleUnMute();
        // } else {
        //     this.handleMute();
        // }
    }

}

export default SoundManager;