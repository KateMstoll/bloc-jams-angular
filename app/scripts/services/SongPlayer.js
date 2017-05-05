(function() {
     function SongPlayer() {
          var SongPlayer = {};
 /**
 * @desc holds current song
 * @type {Object}
 */         
          var currentSong = null;
         
/**
 * @desc Buzz object audio file
 * @type {Object}
 */
          var currentBuzzObject = null;
         
 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
         
   var setSong = function(song) {
    if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
    }
 
    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
 
      currentSong = song;
   };
 
 /**
 * @function playSong
 * @desc Plays song using the buzz library play method
 * @param {Object} song
 */
         
         
  var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
  }
  
  /**
 * @function SongPlayer
 * @desc public method of SongPlayer checks if a song is playing/calls set song/calls set song if paused
 * @param {Object} song
 */
         
         
   SongPlayer.play = function(song) {
         if (currentSong !== song) {
            setSong(song);
            playSong(song);
        } else if (currentSong === song) {
            if (currentBuzzObject.isPaused()) {
            playSong(song);
          }
      }
  };

/**
 * @function SongPlayer.pause
 * @desc public method of Songplayer that pauses the song
 * @param {Object} song
 */
         
    
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };
         
         
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();