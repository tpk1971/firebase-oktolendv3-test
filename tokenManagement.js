const jwt = require('jsonwebtoken');
const fs = require('fs');

const tokenManagement = {

    generate: function(subject){
        
        const privateKey = fs.readFileSync('./private.key', 'utf8');
        const issueTime = Math.floor(Date.now() / 1000);
        const expiryTime = issueTime + 900;
        const payload = {
            iss: "1e00796c-1e1b-45e2-8bd6-e7f85f636315",
            iat: issueTime,
            exp: expiryTime,
            sub: subject
        };

        const options = {
            algorithm: "RS512",
            header: {
                typ: "JWT"
            }
        }

        return token = jwt.sign(payload, privateKey, options);
    }
    

}

module.exports = tokenManagement;