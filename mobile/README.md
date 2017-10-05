<h3> Requirements </h3>

<p> React native development requires several dependencies to be installed.</p>
<a target="_blank" href="https://facebook.github.io/react-native/docs/getting-started.html"> Get started with React native</a>
<br/>

<hr/>

<h3>Libraries and packages</h3>
<p>To implement this app, several libraries and packages were used.</p>
<h4>1. NativeBase</h4>
<p> NativeBase is used to implement pages. NativeBase is a free and open source UI component library for React Native to build native mobile apps for iOS and Android platforms. You can easily set up new pages by using NativeBase.</p>
<a target="_blank" href="https://docs.nativebase.io/">Get started with NativeBase</a>

<br/>

<h4>2. Redux</h4>
<p>Redux is a predictable state container for JavaScript apps based on flux, which is the application architecture that Facebook uses for building client-side web applications. The concept behind flux is similar to MVC. By using redux, you can build your app background service.</p>
<a href="http://redux.js.org/">Get started with redux</a>
<br/>
<a href="https://facebook.github.io/flux/">Learn more about flux</a>
<br/>
<p>To better understand the code structrue, please take a look at this <a href="https://www.youtube.com/watch?v=3msLwu25SQY&list=PLk083BmAphjtGWyZUuo1BiCS_ZAgps6j5">tutorial</a> about building react native app with redux.</p>

<h4>3. react-native-router-flux</h4>
<p>To get your app naviagte around, react-native-router-flux is a good package.</p>
<a href="https://github.com/aksonov/react-native-router-flux">Get started with react-native-router-flux</a>
<br/>
<a href="https://medium.com/differential/react-native-basics-using-react-native-router-flux-f11e5128aff9">A good tutorial about react-native-router-flux</a>

<hr/>
<h3> Android dependencies </h3>
<p>  1. Install Android Studio. </p>
<p>  2. Set up the ANDROID_HOME environment variable. </p>
<p>  3. Create an android virtual device using the emulator in Android studio.  </p>
<p>  4. Launch the android emulated device and compile react native - "react-native run-android". </p>
<p>  5. Double tap R to reload
<hr/>


### Developer guidelines
Please note that REACT NATIVE suffers from dependency issues. To ensure that there are no build errors please follow these guidelines during development.
* Do not directly install packages into the development environment as the package information is not saved and others cloning the repo may have build errors.
* Always add the required package information to package.json
* Run the following command and make sure that your react native version matches the version in package.json
```  react-native -v  ``` .  If the versions don't match use the following command to install the appropriate version (replace the version number as required).
```   npm install react-native@0.43.1   ```
* Once you have ensured that have the right version of react native installed run the following commands to rebuild dependencies.
``` 
rm -vrf node_modules/
npm install
react-native run-android
```


### Build commands

#### Android debug build
Debug build command for development: ``` react-native run-android ```
More information can be found [here](https://facebook.github.io/react-native/docs/signed-apk-android.html)

#### Android release build
```  cd android && ./gradlew assembleRelease ```
The generated APK can be found under android/app/build/outputs/apk/app-release.apk, and is ready to be distributed.

#### Testing release build
``` react-native run-android --variant=release  ```

### Preparing for release
You can read more about preparing the android app for for release [here](https://developer.android.com/studio/publish/preparing.html)

Learn more about Android app distribution options [here](https://developer.android.com/distribute/marketing-tools/alternative-distribution.html)
