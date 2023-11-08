/**
 * FIREMESH - Peer-to-peer content delivery network (CDN)
 * @param {string} peerId - The unique ID of the current user
 * @param {string} peerServer - The PeerJS server URL
 * @param {Object[]} files - List of files with their MD5 checksums
 */
function FIREMESH(peerId, peerServer, files) {
  this.peerId = peerId;
  this.peerServer = peerServer;
  this.files = files;
  this.peer = null;
  this.connections = {};
  /**
   * Initialize the FIREMESH script
   */
  this.init = function() {
    this.peer = new Peer(this.peerId, { host: this.peerServer, port: 9000 });
    this.peer.on('open', function(id) {
      console.log('Connected to PeerJS server with ID: ' + id);
    });
    this.peer.on('connection', this.handleConnection.bind(this));
  };
  /**
   * Handle incoming connections from other users
   * @param {Object} connection - The PeerJS connection object
   */
  this.handleConnection = function(connection) {
    console.log('Received connection from: ' + connection.peer);
    this.connections[connection.peer] = connection;
    connection.on('data', this.handleData.bind(this, connection.peer));
  };
  /**
   * Handle data received from other users
   * @param {string} peerId - The ID of the sending user
   * @param {Object} data - The data received
   */
  this.handleData = function(peerId, data) {
    if (data.type === 'request') {
      this.sendFiles(peerId);
    } else if (data.type === 'file') {
      this.verifyFile(peerId, data.file);
    }
  };
  /**
   * Send files to the requesting user
   * @param {string} peerId - The ID of the requesting user
   */
  this.sendFiles = function(peerId) {
    var self = this;
    this.files.forEach(function(file) {
      fetch(file.url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error fetching file: ' + response.status);
          }
          return response.blob();
        })
        .then(blob => {
          var reader = new FileReader();
          reader.onloadend = function() {
            self.connections[peerId].send({
              type: 'file',
              file: {
                name: file.name,
                checksum: file.checksum,
                data: reader.result
              }
            });
          };
          reader.readAsDataURL(blob);
        })
        .catch(error => {
          console.error(error);
          self.connections[peerId].send({
            type: 'error',
            message: 'Error fetching file: ' + error.message
          });
        });
    });
  };
  /**
   * Verify the MD5 checksum of a downloaded file
   * @param {string} peerId - The ID of the sending user
   * @param {Object} file - The file object with name, checksum, and data
   */
  this.verifyFile = function(peerId, file) {
    var self = this;
    var blob = this.dataURLtoBlob(file.data);
    var reader = new FileReader();
    reader.onloadend = function() {
      var checksum = md5(reader.result);
      if (checksum === file.checksum) {
        console.log('File ' + file.name + ' verified successfully');
        // TODO: Save the file to the website
      } else {
        console.log('File ' + file.name + ' verification failed');
      }
    };
    reader.readAsBinaryString(blob);
  };
  /**
   * Convert a data URL to a Blob object
   * @param {string} dataURL - The data URL to convert
   * @returns {Blob} The converted Blob object
   */
  this.dataURLtoBlob = function(dataURL) {
    var parts = dataURL.split(',');
    var mimeType = parts[0].match(/:(.*?);/)[1];
    var b64Data = atob(parts[1]);
    var arrayBuffer = new ArrayBuffer(b64Data.length);
    var uint8Array = new Uint8Array(arrayBuffer);
    for (var i = 0; i < b64Data.length; i++) {
      uint8Array[i] = b64Data.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeType });
  };
  // Initialize the FIREMESH script
  this.init();
}
// Usage example
var peerId = 'user123';
var peerServer = 'https://peerjs-server.com';
var files = [
  { name: 'image.jpg', checksum: 'md5checksum1', url: 'https://example.com/image.jpg' },
  { name: 'video.mp4', checksum: 'md5checksum2', url: 'https://example.com/video.mp4' },
  { name: 'index.html', checksum: 'md5checksum3', url: 'https://example.com/index.html' }
];
var firemesh = new FIREMESH(peerId, peerServer, files);