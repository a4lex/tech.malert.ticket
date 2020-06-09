import {useState} from 'react';

export default () => {
  const [qrScanner, setQrScanner] = useState({
    showQrScanner: false,
    scanner: null,
    test: Math.random(),
  });

  return [qrScanner, setQrScanner];
};
