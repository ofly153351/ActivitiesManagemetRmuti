import { jwtDecode } from 'jwt-decode'; 
//token -> jwt decode 
export const jwtDecodeToken = (token) => {
    if (token) {
        try {
            const decodedJwt = jwtDecode(token);
            return decodedJwt;
        } catch (error) {
            console.error('Error decoding JWT:', error);
            return null;
        }
    } else {
        return null;
    }
};