(function(){
  function SongPlayer(){
    var SongPlayer = {};

    var currentSong = null;

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as  currentBussObject
    * @param {Object} song
    */
    var setSong = function(song){
      if(currentBuzzObject){
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    }

    /**
    * @function playSong
    * @desc sets the currentBuzzObject to play and sets the song to playing
    */
    var playSong = function(){
      currentBuzzObject.play();
      song.playing = true;
    }

    SongPlayer.play = function(song){
      if(currentSong !== song){
        setSong(song);
        currentBuzzObject.play();
        playSong = true;
      }else if(currentSong === song){
        if(currentBuzzObject.isPaused()){
          currentBuzzObject.play();
        }
      }
    };

    SongPlayer.pause = function(song){
      currentBuzzObject.pause();
      playSong = false;
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
