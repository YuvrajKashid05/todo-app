import jswt from 'jsonwebtoken';

export const generateToken = (id) => {
    return jswt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
}

