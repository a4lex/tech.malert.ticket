import React, {useState, useEffect, useContext} from 'react';
import {Text, StyleSheet} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import {Context as ErrorBagContext} from '../context/ErrorBagContext';
//fadeInUpBig, fadeOutDownBig

export default function ErrorBag() {
  // const insets = useSafeArea();
  const [bag, setBagConfig] = useState({
    msg: '',
    animation: 'fadeOutDownBig',
    isShowing: false,
  });
  const {state, removeError} = useContext(ErrorBagContext);

  // =(
  // Possible Unhandled Promise Rejection (id: 0):
  // Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
  // 1. You might have mismatching versions of React and the renderer (such as React DOM)
  // 2. You might be breaking the Rules of Hooks
  // 3. You might have more than one copy of React in the same app
  // See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.

  useEffect(() => {
    console.log('useEvent ErrorBag');

    if (!bag.isShowing && state.errors.length) {
      console.log('start display err');
      setBagConfig({
        msg: state.errors[0],
        animation: 'fadeInUpBig',
        isShowing: true,
      });

      const timeout = setTimeout(() => {
        console.log('stop display err 1');
        removeError(state.errors[0]);
        setBagConfig({msg: '', animation: 'fadeOutDownBig', isShowing: false});
      }, 2000);
      return () => {
        console.log('stop display err 2');
        removeError(state.errors[0]);
        setBagConfig({msg: '', animation: 'fadeOutDownBig', isShowing: false});
        clearTimeout(timeout);
      };
    }
  }, [state]);

  // if (!state.errors.length) {
  //   return null;
  // }

  return (
    <Animatable.View
      animation={bag.animation}
      style={{
        ...styles.container,
        // paddingBottom: insets.bottom + 16,
      }}>
      <Text style={styles.message}>{bag.msg}</Text>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    justifyContent: 'center',
    backgroundColor: '#b76ba3',
  },
  message: {
    fontSize: 15,
    color: 'white',
  },
});
