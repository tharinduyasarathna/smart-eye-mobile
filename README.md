# Smart Eye Mobile Application
* This mobile application used to get real-time notifications from the smart eye web application. 
Through this app, the user can control the alarm and manage the situation on home premises if a problem occurs.
<p align="center">
  <img src="https://github.com/Tharinduyasarathna27/smart-eye-mobile/blob/master/src/assets/images/1.jpg"  width="200" height="370" >
</p>


# Prerequisites

* Ionic 4
* Firebase Account
* capacitor-fcm plugin
* Smart eye web app up & running

# Build
* Clone the repository to your computer and run follow commands.
   ```bash
      npm install
      ionic serve -l
      
* Use existing smart eye web app firebase project and configure below things.
      
> 1. **Firebase SDK snippet** - Copy that file from your firebase project.
>> ```bash
>>    var firebaseConfig = {
>>       apiKey: "XXXXXXXXXXXXXXXXXXXXX",
>>       authDomain: "XXXXXX.firebaseapp.com",
>>       databaseURL: "https://XXXXXXX.firebaseio.com",
>>       projectId: "XXXXX-7b",
>>       storageBucket: "XXXXXX-7b.appspot.com",
>>       messagingSenderId: "YYYYYYYY",
>>       appId: "XXXXXXXXXXXXXXXX"
>>     };

>> Then paste it to below mentioned locations
>> ```bash
>> * Create environment.ts file on this  "smat-eye-mobile/src/environments/environment.ts" path and paste on it.

> 2. **Setup Capacitor plugin** - use follow link and setup capacitor-fcm

>>```bash
>>https://www.npmjs.com/package/capacitor-fcm

* After all things done correctly you can build project using android studio & deploy to your android phone.

<p >
  <img src="https://github.com/Tharinduyasarathna27/smart-eye-mobile/blob/master/src/assets/images/2.jpg"  width="200" height="370" >

  <img src="https://github.com/Tharinduyasarathna27/smart-eye-mobile/blob/master/src/assets/images/3.jpg"  width="200" height="370" >

  <img src="https://github.com/Tharinduyasarathna27/smart-eye-mobile/blob/master/src/assets/images/4.jpg"  width="200" height="370" >

  <img src="https://github.com/Tharinduyasarathna27/smart-eye-mobile/blob/master/src/assets/images/5.jpg"  width="200" height="370" >
</p>
