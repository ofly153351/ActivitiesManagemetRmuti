import { handlelogOut } from './api';

export function clearUserSession() {
    localStorage.removeItem('expireTime');
    localStorage.removeItem('user');
    localStorage.removeItem('userRoleHash');
}

export async function checkSessionTimeout() {
    const expireTime = localStorage.getItem('expireTime');

    if (!expireTime) return;

    const now = Date.now();

    if (now > Number(expireTime)) {
        clearUserSession();
        try {
            await handlelogOut(); // เผื่อกรณีเป็น async
            window.location.href = '/login';
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    }
}