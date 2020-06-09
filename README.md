# tech.malert.ticket

##### App build:  

git clone https://github.com/a4lex/tech.malert.ticket.git  
npm install  
cd ios/ && pod install  

npx react-native start  
npx react-native run-ios  
npx react-native run-android  
npx react-native run-ios --configuration Release  

# Android

https://reactnative.dev/docs/signed-apk-android

##### keystore generation:  

cd \`/usr/libexec/java\_home\`  
sudo keytool -genkey -v -keystore malert.tech.keystore -alias malert-tech -keyalg RSA -keysize 2048 -validity 10000
> Enter keystore password: malert.tech (hidden)  
> Re-enter new password:  
> What is your first and last name?  
>   [Unknown]:  Alexandr  
> What is the name of your organizational unit?  
>   [Unknown]:  Home  
> What is the name of your organization?  
>   [Unknown]:  Sweet home  
> What is the name of your City or Locality?  
>   [Unknown]:  Kitchen  
> What is the name of your State or Province?  
>   [Unknown]:  Chair  
> What is the two-letter country code for this unit?  
>   [Unknown]:  CR  
> Is CN=Alexandr, OU=Home, O=Sweet home, L=Kitchen, ST=Chair, C=CR correct?  
>   [no]:  yes  

##### App release:   

cd $PROJECT/android

./gradlew bundleRelease -- build AAB (https://android-tools.ru/coding/novyj-sposob-publikacii-prilozhenij-s-pomoshhyu-android-app-bundle/)  
ls -l ../android/app/build/outputs/bundle/release  
  
./gradlew assembleRelease -- build APK  
ls -l ../android/app/build/outputs/apk/release  
