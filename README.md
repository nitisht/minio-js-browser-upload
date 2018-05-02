## Browser uploads to Minio via minio-js presigned URLs

Sample program to benchmark file uploads to Minio server using `minio-js`.

#### Note

- Program will upload 1000 copies of same file to Minio server and report the elapsed time.
- `minio-js` uses pre-signed URLs for each upload request, hence secret key is not exposed.

### 1. Start Minio server

Start a Minio server instance using the steps mentioned [here](https://docs.minio.io/docs/minio-quickstart-guide). Make a note of access key, secret key. Once server is up, create a bucket called `uploads` using client of your choice.

### 2. Configure and start pre-signing server

Install `minio-js` using `npm install --save minio`. Then configure pre-signing server by editing the below fields in `presign-server.js`.

```js
var client = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    secure: false,
    accessKey: 'minio',
    secretKey: 'minio123'
})
```

Then start pre-signing server by `node presign-server.js`.

### 3. Upload files

Access the signing server via your browser. By default it runs on `http://localhost:8081`. Select a file to upload. `minio-js` will start uploading 1000 instances of the same file, once the upload is complete, you'll get a browser alert with total time taken in uploading the files.
