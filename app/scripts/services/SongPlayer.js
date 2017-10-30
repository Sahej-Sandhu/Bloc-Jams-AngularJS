(function(){
  function SongPlayer($rootScope, Fixtures){
    var SongPlayer = {};

    /**
    * @desc pointer to album in Fixtures
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
    var setSong = function(song){
      if(currentBuzzObject){
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentBuzzObject.bind('timeupdate', function(){
        $rootScope.$apply(function(){
          SongPlayer.currentTime = currentBuzzObject.getTime();
          // var duration = currentBuzzObject.getDuration();
        });
      });

      SongPlayer.currentSong = song;
    };

    /**
    * @function playSong
    * @desc plays song
    */
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    };

    /**
    * @function stopSong
    * @desc stops the current song
    */
    var stopSong = function(song){
      currentBuzzObject.stop();
      // SongPlayer.currentSong.playing = null;
      song.playing = null;
    };

    /**
    * @function getSongIndex
    * @desc gets the index of the song
    * @type {number} index number
    */
    var getSongIndex = function(song){
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
    * @function SongPlayer.play
    * @desc sets and plays a song if it is not currently playing and if it is currently paused
    */
    SongPlayer.play = function(song){
      song = song || SongPlayer.currentSong;
      if(SongPlayer.currentSong !== song){
        setSong(song);
        playSong(song);

      }else if(SongPlayer.currentSong === song){
        if(currentBuzzObject.isPaused()){
          currentBuzzObject.play();
        }
      }
    };

    /**
    * @function SongPlayer.pause
    * @desc pauses a song
    */
    SongPlayer.pause = function(song){
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
    * @function SongPlayer.previous
    * @desc get previous index by subtracting currentSongIndex and check to see if previous index exists and assign values accordingly
    */
    SongPlayer.previous = function(){
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if(currentSongIndex < 0){
        stopSong(song);
      }else{
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @function SongPlayer.next
    * @desc
    */
    SongPlayer.next = function(){
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if(currentSongIndex >= currentAlbum.songs.length){
        stopSong(song);
      }else{
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @function setCurrentTime
    * @desc Set current time (in seconds) of currently playing song* @param {Number} time
    */
    SongPlayer.setCurrentTime = function(time){
      if(currentBuzzObject){
        currentBuzzObject.setTime(time);
      }
    };

    /**
    * @desc Player volume
    * @type {Percent}
    */
    SongPlayer.volume = null;

    /**
    * @function SongPlayer.setVolume
    * @desc Set the volume level with seek bar
    */
    SongPlayer.setVolume = function(volume){
      if(currentBuzzObject){
        currentBuzzObject.setVolume(volume);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
