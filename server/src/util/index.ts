import * as md5 from 'md5';
import * as uuidv4 from 'uuid/v4';

export const md5WithSalt = (str) => md5(`${str}-blog`);

export const getUuid = () => uuidv4();
