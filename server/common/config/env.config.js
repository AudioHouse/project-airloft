module.exports = {
    port: 3600,
    appEndpoint: "http://localhost:3600",
    apiEndpoint: "http://localhost:3600",
    jwt_secret: "Su-Per//Sec!!ret/Key-now-available-in-GitHub",
    jwt_expiration_in_seconds: 36000,
    environment: "dev",
    permissionLevels: {
        "NORMAL_USER": 1,
        "PAID_USER": 4,
        "ADMIN": 2048
    },
    hashAlgo: "sha512",
    digestEncoding: "base64",
    mongoUri: "mongodb://127.0.0.1:27017/airloft",
    defaultAdminAccount: {
        groupName: "admin", 
        password: "admin123", 
        quota: 20, 
        isAdmin: true, 
        isLocked: false
    }
};