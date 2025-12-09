import bcrypt from "bcryptjs";

const plain = "MySecret123";

const hashed = await bcrypt.hash(plain, 10);

console.log("Hashed password:", hashed);
