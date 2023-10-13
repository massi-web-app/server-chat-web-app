import * as bcrypt from 'bcrypt';

export async function hashPassword(rawPassword: string) {
  const slat = await bcrypt.genSalt();
  return bcrypt.hash(rawPassword, slat);
}
