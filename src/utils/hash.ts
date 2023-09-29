import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export async function HashPassword(password: string) {
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
}

export async function comparePassword(passString: string, hashString: string) {
  const isMatch = await bcrypt.compare(passString, hashString);
  return isMatch;
}
