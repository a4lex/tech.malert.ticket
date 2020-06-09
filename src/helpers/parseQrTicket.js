import jsrsasign from 'jsrsasign';

const pubKey =
  '-----BEGIN PUBLIC KEY-----' +
  'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMBWKJPB5Ai3Y2RD0XcJ87UhA8HdymUB' +
  'om14Z6/QjvL7AsdAoh+ro47uidZ5tpNZ1XZ60FUKeNcwJmlFatDijr8CAwEAAQ==' +
  '-----END PUBLIC KEY-----';

const parseQrTicket = _b64data => {
  if (!_b64data.startsWith('TICKET: ')) {
    return ['No usable data found', null];
  }
  try {
    let [b64data, b64sign] = _b64data.replace('TICKET: ', '').split('.');
    if (!b64data || !b64sign) {
      throw {};
    }

    let strObj = jsrsasign.b64utoutf8(b64data);
    console.log('1');

    let ver = new jsrsasign.KJUR.crypto.Signature({alg: 'SHA1withRSA'});
    ver.init(pubKey);
    ver.updateString(strObj);
    let isValid = ver.verify(jsrsasign.b64nltohex(b64sign));

    if (isValid) {
      return [null, JSON.parse(strObj)];
    } else {
      throw {};
    }
  } catch (error) {
    return ['Attention! Fake Ticket.', null];
  }
};

export default parseQrTicket;
