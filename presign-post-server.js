var Minio = require('minio');

var client = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    secure: false,
    accessKey: 'minio',
    secretKey: 'minio123'
})

// express is a small HTTP server wrapper, but this works with any HTTP server
const server = require('express')()

server.get('/presignedUrl', (req, res) => {
    // Construct a new postPolicy.
    var policy = client.newPostPolicy()
    // Set the object name my-objectname.
    policy.setKey(req.query.name)
    // Set the bucket to my-bucketname.
    policy.setBucket('uploads')

    var expires = new Date
    expires.setSeconds(24 * 60 * 60 * 10) // 10 days expiry.
    policy.setExpires(expires)
    client.presignedPostPolicy(policy, function(e, urlStr, formData) {
        if (e) throw e
        res.end(JSON.stringify({urlStr, formData}))
    })
})

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/index-post.html');
})

server.listen(8081)
