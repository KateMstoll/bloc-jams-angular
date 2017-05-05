(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};
 /**
 * @desc which album is playing
 * @type {Object}
 */        
         var currentAlbum = Fixtures.getAlbum();
         
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
        SongPlayer.currentSong.playing = null;
    }
 
    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
 
      SongPlayer.currentSong = song;
   };
 
 /**
 * @function getSongIndex
 * @desc Gets the song index for the next and previous btns
 * @param {Object} song
 */        
 
 var getSongIndex = function(song) {
     return currentAlbum.songs.indexOf(song);
 };
  
/**
* @desc Active song object from list of songs
* @type {Object}
*/
    SongPlayer.currentSong = null;
                
         
         
         
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
         song = song || SongPlayer.currentSong;
         if (SongPlayer.currentSong !== song) {
            setSong(song);
            playSong(song);
        } else if (SongPlayer.currentSong === song) {
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
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
        
 /**
 * @function SongPlayer.previous
 * @desc jumps back a song, if on the first song it will stop the song and reset the song 
 * @param {Object} song
 */
         
         
    SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;
        
         if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
     }else{
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };
         
         
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();