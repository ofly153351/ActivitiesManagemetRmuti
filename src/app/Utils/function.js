// import { jwtDecode } from 'jwt-decode';

export const jwtDecodeToken = (token) => {
    if (!token) {
        console.error('Token is null or undefined');
        return null; // Return null if the token is missing
    }

    try {
        const decodedJwt = jwtDecode(token);
        return decodedJwt; // Return the decoded token
    } catch (error) {
        console.error('Error decoding JWT:', error.message);
        return null; // Return null if the token is invalid
    }
};