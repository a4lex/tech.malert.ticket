import jsrsasign from 'jsrsasign';

export const validateToken = token =>
  token && (token.startsWith('LONG_JWT: ') || token.startsWith('SHORT_JWT: '));

export const isExpired = token => {
  if (!token) {
    return true;
  }
  token = token.replace(/^(SHORT|LONG)_JWT: /, '');
  let jwt = JSON.parse(jsrsasign.b64utoutf8(token.split('.')[1]));
  // multiply by 1000 to convert seconds into milliseconds
  // sub 15 seonds from expire - to update in advance
  return jwt && jwt.exp && Date.now() > jwt.exp * 1000 - 15 * 1000;
};
