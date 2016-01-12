// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'btford.socket-io'])

.factory('socket', function(socketFactory) {
  var myIoSocket = io.connect('http://localhost:4567', {transports: ['websocket']});
  myIoSocket.on('connection', function(socket){
    socket.on('beep', function(){
      console.log("Beep received");
      socket.emit('msg');
    });
  });

  mySocket = socketFactory({
      ioSocket: myIoSocket
  });

  return {
    getSocket: function() {
      return mySocket;
    },
    connect: function (address) {
      var myIoSocket = io.connect(address);
      mySocket = socketFactory({
        ioSocket: myIoSocket
      });
    }
  };
})

.factory('BluetoothService', function($ionicPopup) {
  return {
    getBLE: function() {
      return ble;
    },
    scanDevices: function(onSuccess, onFailure) {
      ble.startScan([], onSuccess, onFailure);
    },
    stopScan: function(onSuccess, onFailure) {
      ble.stopScan(onSuccess, onFailure);
    },
    requestBluetoothEnabled: function() {
      console.log('Called');
      console.log(ble);
      if(!ionic.Platform.isIOS()) {
        ble.enable(function(){
          console.log("Success");
        }, function(){
          console.log("Failed");
          $ionicPopup.alert({
            title: "Auto-On Bluetooth Failed",
            template: "Please manually switch on your bluetooth.",
          });
        });
      } else{               
        console.log("isIOS");   
        $ionicPopup.alert({
          title: "Bluetooth Disabled",
          template: "Please enable your bluetooth first.",
        });
      }
      // if (on && !BC.bluetooth.isopen) {
      //   if(!ionic.Platform.isIOS()) {
      //     BC.Bluetooth.OpenBluetooth(function(){
      //       console.log("Success");
      //     }, function(){
      //       $ionicPopup.alert({
      //         title: "Auto-On Bluetooth Failed",
      //         template: "Please manually switch on your bluetooth.",
      //       });
      //     });
      //   } else{                  
      //     $ionicPopup.alert({
      //       title: "Bluetooth Disabled",
      //       template: "Please enable your bluetooth first.",
      //     });
      //   }
      // }
    }
  }
})

.run(function($ionicPlatform, BluetoothService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    BluetoothService.requestBluetoothEnabled();
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
