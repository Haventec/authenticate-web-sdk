

# Haventec Authenticate Web SDK

A collection of javascript functions to facilitate client-side integration with Haventec Authenticate.

## Installation

`npm install @haventec/authenticate-web-sdk`

## General Usage

The authenticate-web-sdk is not exported as a default export and an instance of it should be created for each user.
```
import { HaventecAuthenticate } from '@haventec/authenticate-web-sdk' 
let haventecAuthenticate = new HaventecAuthenticate();
```
The implementation requires the window object (browser) and will not function in a node.js environment. 

## Angular Usage:

```
export function HaventecAuthenticateFactory() {
    return new HaventecAuthenticate();
};

export let HaventecAuthenticateProvider = { provide: HaventecAuthenticate,
    useFactory: HaventecAuthenticateFactory,
    deps: []
};
```

Then you can add HaventecAuthenticateProvider to the providers array of the @NgModule, and inject HaventecAuthenticate into the constructors of @Components as is standard.

## Methods 


* **initialiseStorage:** It sets the current user, with data, initialising the salt if not already set. Any existing data is not overridden, so effectively enables use switching. Optionally can regenerate the salt.
* **updateStorage:** It updates the storage with the object passed as parameter.

* **getDeviceName:** It returns device-name set by default.

* **clearAccessToken:** It clears the access-token for the active user.
* **getAccessToken:** It returns the access-token of the user.

* **getUsername:** It returns username of the current user.
* **getActiveUsernames:** It returns the usernames of all activated users.

* **getDeviceUuid:** It returns the uuid of the device generated through authenticate.
* **getUserUuid:** It returns the uuid of the current user.

* **getAuthKey:** It returns the current authKey of the current user from Storage.
* **getSalt:** It returns the generated salt value for the current user from Storage.
* **setSalt:** It sets the salt value for the current user to Storage.
* **regenerateSalt:** It regenerates the salt value for the current user to Storage.

* **clearUserStorage:** It clears the entire local and session storage used by the user.
* **hashPin:** It returns a SHA-512 Hashing of the PIN passed as argument.
* **getDeviceInfo:** It returns the information about device including the fingerprint.


## Development

 To build and publish locally, clone the project and run the following: 
 ```
 npm install
 npm pack / npm publish
  ```

## License

This code is available under the MIT license. A copy of the license can be found in the LICENSE file included with the distribution.

