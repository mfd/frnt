/**
 * E V E N T S
 */

const Events = {

	// SoundManager events
	Sound : {
		MUTE: "@sound / MUTE",
		UNMUTE: "@sound / UNMUTE",
		TOGGLE_MUTE: "@sound / TOGGLE_MUTE",
		PLAY: "@sound / PLAY",
		STOP: "@sound / STOP",
		CROSSFADE: "@sound / CROSSFADE",
	},

	// GoogleMap events
	GoogleMap : {
		CLOSE_ALL_INFOBOX : "@infobox / CLOSE"
	},

	// VimeoPlayer
	VimeoPlayer : {
		PLAY : "@vimeo / PLAY",
		PAUSE : "@vimeo / PAUSE",
		END : "@vimeo / END",
		SEEK : "@vimeo / SEEK",
		LOADED : "@vimeo / LOADED"
	},

	// sample events
	Video : {
		PAUSE	: "video_paused_paused",
		END		: "video_paused_ended"
	},

	Filter : {
		CLOSE  : "close_filter",
		UPDATE  : "filter_changed",
		SEARCH	: "search_filter"
	},

	Header : {
		TOGGLE : "toggle_hide_show_header"
	}

};

export default Events;


// WEBPACK FOOTER //
// ../src/js/nsfw/events/Events.js