angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, BluetoothService) {
  var onDeviceFound = function(device) {
    console.log(JSON.stringify(device));
    $scope.devices.push({
      deviceId  : device.id,
      name      : device.name,
      
    });
  };
  var onScanFailure = function(message) {
    console.log(message);
  };
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.scanning = false;
  $scope.devices = Array();

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/manage.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.manageModal = modal;
  });;

  $scope.closeManage = function() {
    $scope.manageModal.hide();
    $scope.scanning = false;
  };

  $scope.manage = function() {
    $scope.manageModal.show();
    $scope.$watchCollection('devices', function(newVal, oldVal) {
      console.log('changed to', newVal);
    })
  };

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.getDeviceIconClass = function(status) {
    console.log('Getting icon for', status);

  }

  $scope.startStopScan = function() {
    console.log('Scanning toggle', $scope.scanning);
    $scope.scanning = !$scope.scanning;
    if ($scope.scanning) {
      BluetoothService.scanDevices(onDeviceFound, onScanFailure);
    } else {
      BluetoothService.stopScan(function() {
        console.log('Scanning stopped');
      }, function(){
        $scope.scanning = true;
        $ionicPopup.alert({
          title: "Stop Scanning Failed",
          template: "An error occured while stopping the scanning. Please try again.",
        });
      });
    }
    
    // $scope.scanning = !$scope.scanning;
    // if ($scope.devices.length == 0) {
    //   $scope.devices.push({
    //     'address' : 'AA:FF:00:11:BA:DD',
    //     'name'    : 'device1',
    //     'type'    : 'spider',
    //     'status'  : 'ready'
    //   });
    //   $scope.devices.push({
    //     'address' : 'AA:FF:00:11:CC:DD',
    //     'name'    : 'device2',
    //     'type'    : 'sphero',
    //     'status'  : 'connected'
    //   });
    //   $scope.devices.push({
    //     'address' : 'AA:FF:00:11:11:DD',
    //     'name'    : 'device3',
    //     'type'    : 'spider',
    //     'status'  : 'unknown'
    //   });
    // }
    // console.log($scope.devices);
  }
  
  $scope.doConnect = function(connect) {

  }
})

.controller('NetworkCtrl', function (socket){
  socket.on('connect', function (data) {
    console.log("Connected");
    console.log(data);
  });
  socket.on('msg', function (data) {
    console.log("Data received");
    console.log(data);
  });
})

.controller('PlaylistsCtrl', function($scope, socket) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
  mSocket = socket.getSocket();
  mSocket.on('connect', function (data) {
    console.log("Connected");
    console.log(data);
  });
  mSocket.on('msg', function (data) {
    console.log("Data received");
    console.log(data);
  });
  $scope.sendMessage = function () {
    console.log("Sending message");
    mSocket.emit('msg', {source: 'phone'});
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
