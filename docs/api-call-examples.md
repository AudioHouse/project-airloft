# API Resources
This document shows example API calls with the various routes and resources associated with AirLoft's RESTful API

## /api/tokens
Request an Access-Token to authenticate with the server. Access-Tokens are also used for authorization. POST to create an access token, and GET to receive details about the owner of the token.

POST: Create a Token
```bash
curl --location --request POST 'http://127.0.0.1:3600/api/tokens' \
--header 'Content-Type: application/json' \
--data-raw '{ 
    "groupName": "admin",
    "password": "admin123"
}'
```
GET: Get info about a Token's owner
```bash
curl --location --request GET 'http://127.0.0.1:3600/api/tokens' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <access-token>'
```
## /api/groups
Everything in AirLoft revolves around Groups - they are the "users" or "orgs" of the cloud management system. Groups own, build, and deploy resources across the PaaS. You can think of them as the userbase that make of AirLoft's tenants. Admins can create, modify, and delete groups. Non-admin groups can get information about themselves, but not other groups.

POST: Create a Group
```bash
curl --location --request POST 'http://127.0.0.1:3600/api/groups' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <access-token>' \
--data-raw '{ 
    "groupName": "test-user", 
    "password": "blobby", 
    "quota": "20", 
    "isAdmin": "true", 
    "isLocked": "false" 
}'
```
GET: Get info about a Group
```bash
curl --location --request GET 'http://127.0.0.1:3600/api/groups/<group-id>' \
--header 'Authorization: Bearer <access-token>'
```
GET: Get information about ALL Groups in the system
```bash
curl --location --request GET 'http://127.0.0.1:3600/api/groups' \
--header 'Authorization: Bearer <access-token>'
```
PATCH: Update an existing Group
```bash
curl --location --request PATCH 'http://127.0.0.1:3600/api/groups/<group-id>' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <access-token>' \
--data-raw '{ 
    "groupName": "woot", 
    "password": "blobby2", 
    "quota": "35", 
    "isAdmin": "true", 
    "isLocked": "false" 
}'
```
DELETE: Remove an existing Group
```bash
curl --location --request DELETE 'http://127.0.0.1:3600/api/groups/<group-id>' \
--header 'Authorization: Bearer <access-token>'
```

