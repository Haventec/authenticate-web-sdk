# Haventec Authenticate client JS

A collection of javascript functions to facilitate client-side interaction with Haventec backend services. 


# Getting Started

## Installation

```bash
npm install @haventec/authenticate-client-js
```

## Getting Started

Start by importing the HaventecAuthenticateClient (For Angular 2+ see  "Angular 2+ Setup" below)

```javascript
import { HaventecAuthenticateClient } from '@haventec/authenticate-client-js;

let haventecAuthenticateClient = new HaventecAuthenticateClient();
```

Initiate your Application and set the domain of your backend server. You can get your Application UUID from registering an Organisation at https://console.haventec.com and adding a new application. 

```javascript
initialize('https://my-backend-server.com', '1111-1111-1111-1111-1111-1111');
```

Sign up a user. 

```javascript
signUp('NewUser', 'newuser@somedomain.com').then(
      data => {
          // User was successfully signed up
      },
      err => {
          // Something when wrong
      }
   );
```

Log the user in

```javascript
login('NewUser', '1234').then(
      data => {
          // User has successfully logged in
      },
      err => {
          // Something when wrong
      }
    );
```

Log the user out

```javascript
login().then(
     data => {
         // User has successfully logged out
     },
     err => {
         // Something when wrong
     }
   );
```

### Angular 2+ Setup

For Angular 2+, HaventecAuthenticateClientProvider is provided to easily inject HaventecAuthenticateClient into your Module, 
simply add it to the providers array. It can then be injected into constructors as is typical.

```javascript
import { HaventecAuthenticateClient, HaventecAuthenticateClientFactory } from '@haventec/authenticate-client-js';

...

providers: [
    { provide: HaventecAuthenticateClient, useFactory: HaventecAuthenticateClientFactory, deps: [ ] }
]
```

# API

### Initialise your application

This function initialises the client. It sets the domain of your backend server, and the application uuid. 
If your backend server is already configured with the applicationUuid, this is not necessary
You can see your application uuid in the Haventec Console -> Applications -> Your application 

```javascript
initialize(domain: string, applicationUuid?: string)
```

| Parameter | Required | Description |
| ----- | ----- | ----- |
| domain | Yes | Your backend server server domain (https://your-domain.com/some-path) |
| applicationUuid | No | Your Haventec Authentication application uuid. For backend servers that act as proxy to Authenticate, this is not necessary |

### Activate device

Activate the user's recently added device.

```javascript
activateDevice(username: string, pin: string, activationToken: string, customHeaders?: any, urlOverwrite?:string)
```

| Parameter | Required | Description |
| ----- | ----- | ----- |
| username | Yes | The user's name, can be a real name, alias or email|
| pin | Yes | The user's PIN |
| activationToken | Yes | The activation token send to the user in an out of band channel (email, push notification). This is controlled by the backend |
| customHeaders | No | Send specific custom HTTP headers along with the request, in a key-value Javascript object|
| urlOverwrite | No | Overwrite the backend path URL, example '/my-custom-backend-path'. Note this overwrites the URL path not the domain|

### Add device

Add the user's current device.

```javascript
addDevice(username: string, deviceName?: string, customHeaders?: any, urlOverwrite?:string)
```

| Parameter | Required | Description |
| ----- | ----- | ----- |
| username | Yes | The user's name, can be a real name, alias or email|
| deviceName | No | The name of the device being registered. If undefienced the client with auto generate the device name based on the OS, browser and hardware |
| customHeaders | No | Send specific custom HTTP headers along with the request, in a key-value Javascript object|
| urlOverwrite | No | Overwrite the backend path URL, example '/my-custom-backend-path'. Note this overwrites the URL path not the domain |

### Activate user

```javascript
activateUser(username:string, activationToken:string, pin:string, customHeaders?: any, urlOverwrite?:string, deviceName?:string)
```

| Parameter | Required | Description |
| ----- | ----- | ----- |
| username | Yes | The user's name, can be a real name, alias or email|
| activationToken | Yes | The activation token sent to the user in an out of band channel (email, push notification). This is controlled by the backend |
| pin | Yes | The user's PIN |
| customHeaders | No | Send specific custom HTTP headers along with the request, in a key-value Javascript object|
| urlOverwrite | No | Overwrite the backend path URL, example '/my-custom-backend-path'. Note this overwrites the URL path not the domain|

### Delete device

```javascript
deleteDevice(deviceUuid: string, customHeaders?: any, urlOverwrite?:string)
```

| Parameter | Required | Description |
| ----- | ----- | ----- |
| deviceUuid | Yes | The uuid of the device you want to delete. The user must be the owner of the device to be able to delete it.|
| customHeaders | No | Send specific custom HTTP headers along with the request, in a key-value Javascript object|
| urlOverwrite | No | Overwrite the backend path URL, example '/my-custom-backend-path'. Note this overwrites the URL path not the domain|

### Lock device

```javascript
lockDevice(deviceUuid: string, customHeaders?: any, urlOverwrite?:string)
```

| Parameter | Required | Description |
| ----- | ----- | ----- |
| deviceUuid | Yes | The uuid of the device you want to lock. The user must be the owner of the device to be able to lock it.|
| customHeaders | No | Send specific custom HTTP headers along with the request, in a key-value Javascript object|
| urlOverwrite | No | Overwrite the deleteDevice backend path URL, example '/my-custom-backend-path'. Note this overwrites the URL path not the domain|

### Unlock device

```javascript
unlockDevice(deviceUuid: string, customHeaders?: any, urlOverwrite?:string)
```

| Parameter | Required | Description |
| ----- | ----- | ----- |
| deviceUuid | Yes | The uuid of the device you want to unlock. The user must be the owner of the device to be able to unlock it.|
| customHeaders | No | Send specific custom HTTP headers along with the request, in a key-value Javascript object|
| urlOverwrite | No | Overwrite the backend path URL, example '/my-custom-backend-path'. Note this overwrites the URL path not the domain|

### Forgot PIN

Initiate a Forgot PIN request.

```javascript
forgotPin(username: string, customHeaders?: any, urlOverwrite?:string)
```
| Parameter | Required | Description |
| ----- | ----- | ----- |
| username | Yes | The user's username |
| customHeaders | No | Send specific custom HTTP headers along with the request, in a key-value Javascript object|
| urlOverwrite | No | Overwrite the backend path URL, example '/my-custom-backend-path'. Note this overwrites the URL path not the domain|

### Get the current user details

```javascript
getCurrentUserDetails(customHeaders?: any, urlOverwrite?:string)
```

| Parameter | Required | Description |
| ----- | ----- | ----- |
| customHeaders | No | Send specific custom HTTP headers along with the request, in a key-value Javascript object|
| urlOverwrite | No | Overwrite the backend path URL, example '/my-custom-backend-path'. Note this overwrites the URL path not the domain|


### Get a users devices

Get a list of device for a user.

```javascript
getUserDevices(userUuid: string, customHeaders?: any, urlOverwrite?:string)
```

| Parameter | Required | Description |
| ----- | ----- | ----- |
| userUuid | Yes | The user's uuid |
| customHeaders | No | Send specific custom HTTP headers along with the request, in a key-value Javascript object|
| urlOverwrite | No | Overwrite the deleteDevice backend path URL, example '/my-custom-backend-path'. Note this overwrites the URL path not the domain|


### Login

```javascript
login(username: string, pin: string, customHeaders?: any, urlOverwrite?:string)
```

| Parameter | Required | Description |
| ----- | ----- | ----- |
| username | Yes | The user's username |
| pin | Yes | The user's PIN |
| customHeaders | No | Send specific custom HTTP headers along with the request, in a key-value Javascript object|
| urlOverwrite | No | Overwrite the backend path URL, example '/my-custom-backend-path'. Note this overwrites the URL path not the domain|


### Logout

```javascript
logout(customHeaders?: any, urlOverwrite?:string)
```
| Parameter | Required | Description |
| ----- | ----- | ----- |
| customHeaders | No | Send specific custom HTTP headers along with the request, in a key-value Javascript object|
| urlOverwrite | No | Overwrite the logout backend path URL, example '/my-custom-backend-path'. Note this overwrites the URL path not the domain|

### Reset PIN

Reset a PIN for a device. Each device has an independent PIN, resetting a PIN does not reset the user PIN across all of there devices, it only resets the PIN on the device that request the reset PIN. 

```javascript
resetPin(username: string, resetPinToken: string, pin:string, customHeaders?: any, urlOverwrite?:string)
```
| Parameter | Required | Description |
| ----- | ----- | ----- |
| username | Yes | The user's username |
| resetPinToken | Yes | The reset PIN token sent to the user in an out of band channel (email, push notification). This is controlled by the backend |
| pin | Yes | The user's PIN |
| customHeaders | No | Send specific custom HTTP headers along with the request, in a key-value Javascript object|
| urlOverwrite | No | Overwrite the login backend path URL, example '/my-custom-backend-path'. Note this overwrites the URL path not the domain|


### Sign up a user

```javascript
signUp(username: string, email: string, customHeaders?: any, urlOverwrite?:string, mobileNumber?: string)
```
| Parameter | Required | Description |
| ----- | ----- | ----- |
| username | Yes | The user's username |
| email | Yes | The user's email |
| customHeaders | No | Send specific custom HTTP headers along with the request, in a key-value Javascript object|
| urlOverwrite | No | Overwrite the login backend path URL, example '/my-custom-backend-path'. Note this overwrites the URL path not the domain|
| mobileNumber | No | The user's mobile number |


## General-purpose Functions

### isAdmin

Detects if the logged-in user is an Admin user

```javascript
haventecAuthenticateClient.isAdmin(); 
```


### purge

Removes all data for the current user - including localStorage

```javascript
haventecAuthenticateClient.purge(); 
```


### invalidateToken

Sets the token of the current user to undefined, so that no further calls can be made

```javascript
haventecAuthenticateClient.invalidateToken(); 
```


### getDeviceName

Get the device name of the current device

```javascript
let deviceName = haventecAuthenticateClient.getDeviceName(); 
```

### getUserUuid

Returns the Haventec userUuid unique ID representing the current authenticated user. Returns undefined if not authenticated

```javascript
let userUuid = haventecAuthenticateClient.getUserUuid(); 
```

### getApplicationUuid

Returns the Haventec applicationUuid unique ID representing the application of the current user. Returns undefined if there a user has not been provisioned on the current device

```javascript
let applicationUuid = haventecAuthenticateClient.getApplicationUuid(); 
```

## Build and Publish
This project uses [npmextra](https://www.npmjs.com/package/npmextra)
Configuration options can be found [here](https://github.com/gitzonetools/npmts/blob/master/docs/config.md)
To build run the command
```bash
npmts
npm publish
```

### Test build locally before publishing
Compile the code
```bash
npmts
```
Package the code (creates a file called haventec-common-js-x.x.x.tgz)
```bash
npm pack
```

Create a test npm project and add the package from above
 ```bash
 mkdir test-haventec-common-js
 cd test-haventec-common-js
 npm init
 npm install [path-to]/haventec-common-js-x.x.x.tgz
 ```

Now you can use Haventec's common-js in your new 

## Publish
```bash
npm publish
```

## License

This code is available under the MIT license. A copy of the license can be found in the LICENSE file included with the distribution.
 