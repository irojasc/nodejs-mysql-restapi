import bcrypt from 'bcryptjs'


export const decode = async (plainText, hashText) => {
    const result = await bcrypt.compare(plainText, hashText)
    return result
}