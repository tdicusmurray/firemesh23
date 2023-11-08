# FIREMESH User Manual

## Introduction

FIREMESH is a JavaScript script that enables users connected to a website to seamlessly acquire website content, including images, videos, and HTML, directly from fellow connected users. It eliminates the need for a centralized server by operating as a peer-to-peer content delivery network (CDN). FIREMESH ensures data integrity by meticulously verifying the MD5 checksum of downloaded files.

This user manual provides detailed instructions on how to install the necessary dependencies and use FIREMESH in your website.

## Installation

To use FIREMESH, you need to include the `firemesh.js` script in your website and install the required dependencies.

### Step 1: Include the FIREMESH Script

1. Download the `firemesh.js` file from the provided source.
2. Place the `firemesh.js` file in your project directory.
3. In your HTML file, include the following script tag in the `<head>` section:

```html
<script src="firemesh.js"></script>
```

### Step 2: Install Dependencies

FIREMESH relies on two external libraries: PeerJS and blueimp-md5. You can include them in your HTML file by adding the following script tags before the `firemesh.js` script tag:

```html
<script src="https://cdn.jsdelivr.net/npm/peerjs@1.3.2/dist/peerjs.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.18.0/js/md5.min.js"></script>
```

## Usage

Once you have included the FIREMESH script and installed the dependencies, you can start using FIREMESH in your website.

### Initializing FIREMESH

To initialize FIREMESH, create a new instance of the `FIREMESH` class and provide the required parameters: `peerId`, `peerServer`, and `files`.

```javascript
var peerId = 'user123';
var peerServer = 'https://peerjs-server.com';
var files = [
  { name: 'image.jpg', checksum: 'md5checksum1', url: 'https://example.com/image.jpg' },
  { name: 'video.mp4', checksum: 'md5checksum2', url: 'https://example.com/video.mp4' },
  { name: 'index.html', checksum: 'md5checksum3', url: 'https://example.com/index.html' }
];
var firemesh = new FIREMESH(peerId, peerServer, files);
```

Make sure to replace `user123` with a unique ID for the current user and `https://peerjs-server.com` with the URL of your PeerJS server.

### Acquiring Website Content

FIREMESH allows users to acquire website content from fellow connected users. When a user requests a file, FIREMESH will send the file to the requesting user if it is available.

To request files from other users, you can use the following code:

```javascript
firemesh.sendFiles(peerId);
```

Replace `peerId` with the ID of the user you want to request files from.

### Verifying Downloaded Files

FIREMESH verifies the MD5 checksum of downloaded files to ensure data integrity. When a file is received, FIREMESH will automatically verify its checksum.

To handle the verification process, you can implement the logic inside the `verifyFile` function in the `FIREMESH` class.

```javascript
this.verifyFile = function(peerId, file) {
  // Add your verification logic here
};
```

You can access the file's name, checksum, and data using `file.name`, `file.checksum`, and `file.data`, respectively.

## Conclusion

Congratulations! You have successfully installed and used FIREMESH in your website. With FIREMESH, users can seamlessly acquire website content from other connected users, eliminating the need for a centralized server. Enjoy the benefits of a peer-to-peer content delivery network and ensure data integrity with MD5 checksum verification.