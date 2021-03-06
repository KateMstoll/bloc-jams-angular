(function() {
     function SongPlayer($rootScope, Fixtures) {
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
        stopSong();
    }
 
    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
       
       
    currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
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
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
    SongPlayer.currentTime = null;
    
 /**
 * @desc Current volume (scale 0 - 100)
 * @type {Number}
 */        
         
    SongPlayer.volume = null;
         
                
         
         
         
 /**
 * @function playSong
 * @desc Plays song using the buzz library play method
 * @param {Object} song
 */
         
         
  var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
  }
  
  var stopSong = function(song){
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
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
            stopSong();
     }else{
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };

/**
 * @function SongPlayer.next
 * @desc jumps forward, if on the last song it will stop the song and reset the song 
 * @param {Object} song
 */
    
    SongPlayer.next = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex++;
        
         if (currentSongIndex > currentAlbum.length) {
             stopSong();
     }else{
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }
 };
     
/**
 * @function setCurrentTime
 * @desc Sets current time
 * @param {Number} time
 */
    
         
    SongPlayer.setCurrentTime = function(time) {
       
        if (currentBuzzObject) {
            currentBuzzObject.setTime(time);
        }
    };  
         
/**
 * @function setCurrentTime
 * @desc Sets current volume
 * @param {Number} volume
 */     
         
    SongPlayer.setVolume = function(volume){
        if (currentBuzzObject){
            currentBuzzObject.setVolume(volume);
        }
    };     
         
          return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();