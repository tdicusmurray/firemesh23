# FIREMESH User Manual

## Introduction

FIREMESH is a JavaScript script that enables users connected to a website to seamlessly acquire website content, including images, videos, and HTML, directly from fellow connected users. It eliminates the need for a centralized server by operating as a peer-to-peer content delivery network (CDN). FIREMESH ensures data integrity by meticulously verifying the MD5 checksum of downloaded files.

This user manual provides detailed instructions on how to install and use FIREMESH in your website.

## Installation

To use FIREMESH, you need to include the PeerJS library and the FIREMESH script in your HTML file.

1. Include the PeerJS library by adding the following script tag to the head section of your HTML file:

```html
<script src="https://cdn.peerjs.com/1.3.2/peer.min.js"></script>
```

2. Include the FIREMESH script by adding the following script tag to the head section of your HTML file:

```html
<script src="firemesh.js"></script>
```

## Usage

To use FIREMESH, follow these steps:

1. Create a JSON list of files along with their corresponding MD5 checksums. The JSON list should have the following structure:

```json
[
  { "url": "path/to/image.jpg", "md5": "5d41402abc4b2a76b9719d911017c592" },
  { "url": "path/to/video.mp4", "md5": "098f6bcd4621d373cade4e832627b4f6" },
  { "url": "path/to/page.html", "md5": "1f3870be274f6c49b3e31a0c6728957f" }
]
```

2. Create an instance of the FIREMESH class and pass the JSON list as a parameter:

```javascript
const fileList = [
  { "url": "path/to/image.jpg", "md5": "5d41402abc4b2a76b9719d911017c592" },
  { "url": "path/to/video.mp4", "md5": "098f6bcd4621d373cade4e832627b4f6" },
  { "url": "path/to/page.html", "md5": "1f3870be274f6c49b3e31a0c6728957f" }
];

const firemesh = new FIREMESH(fileList);
```

3. Initialize the FIREMESH instance by calling the `init` method and passing a unique peer ID as a parameter:

```javascript
firemesh.init('your-peer-id');
```

4. FIREMESH will automatically connect to peers and start downloading the files. The files will be downloaded from the peers who have the corresponding MD5 checksums.

## Example

Here is an example of how to use FIREMESH in your website:

```html
<!DOCTYPE html>
<html>
<head>
  <title>FIREMESH Example</title>
  <script src="https://cdn.peerjs.com/1.3.2/peer.min.js"></script>
  <script src="firemesh.js"></script>
</head>
<body>
  <script>
    const fileList = [
      { "url": "path/to/image.jpg", "md5": "5d41402abc4b2a76b9719d911017c592" },
      { "url": "path/to/video.mp4", "md5": "098f6bcd4621d373cade4e832627b4f6" },
      { "url": "path/to/page.html", "md5": "1f3870be274f6c49b3e31a0c6728957f" }
    ];

    const firemesh = new FIREMESH(fileList);
    firemesh.init('your-peer-id');
  </script>
</body>
</html>
```

Make sure to replace `'your-peer-id'` with a unique peer ID for each user.

## Conclusion

FIREMESH allows users connected to a website to seamlessly acquire website content from fellow connected users, eliminating the need for a centralized server. By following the installation and usage instructions provided in this manual, you can easily integrate FIREMESH into your website and leverage its peer-to-peer content delivery network capabilities.