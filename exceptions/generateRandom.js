import { v4 as uuidv4 } from 'uuid';
export function generateRandom() {
    return uuidv4().slice(-12);
}
