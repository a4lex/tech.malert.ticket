# tech.malert.ticket

### App build:
> git clone https://github.com/a4lex/tech.malert.ticket.git  
> npm install  
> cd ios/ && pod install  

### Debug
> npx react-native start  
> npx react-native run-ios  
> npx react-native run-android  
> npx react-native run-ios --configuration Release  

### Android
https://reactnative.dev/docs/signed-apk-android

#### keystore generation:  

cd \`/usr/libexec/java\_home\`  
sudo keytool -genkey -v -keystore malert.tech.keystore -alias malert-tech -keyalg RSA -keysize 2048 -validity 10000  
> Enter keystore password: malert.tech (hidden)  
> Re-enter new password:  
> What is your first and last name?  
>   [Unknown]:  Malert Tech  
> What is the name of your organizational unit?  
>   [Unknown]:  Product Management  
> What is the name of your organization?  
>   [Unknown]:  Argos Technology Resources Private Limited  
> What is the name of your City or Locality?  
>   [Unknown]:  Kolkata  
> What is the name of your State or Province?  
>   [Unknown]:  West Bengal  
> What is the two-letter country code for this unit?  
>   [Unknown]:  IN  
> Is CN=Malert Tech, OU=Product Management, O=Argos Technology Resources Private Limited, L=Kolkata, ST=West Bengal, C=IN correct?  
>   [no]:  yes  

### App release:   

cd $PROJECT/android

#### build AAB

> ./gradlew bundleRelease ( https://android-tools.ru/coding/novyj-sposob-publikacii-prilozhenij-s-pomoshhyu-android-app-bundle/)  
ls -l ../android/app/build/outputs/bundle/release  
 
#### build APK
> ./gradlew assembleRelease  
ls -l ../android/app/build/outputs/apk/release
