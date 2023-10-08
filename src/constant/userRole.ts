import { LocalStorageKey } from "../enums/authEnum";

const getUserData = JSON.parse(localStorage.getItem(LocalStorageKey.userData) as string)
const superAdmin = getUserData?.email === 'superadmin@example.com';
const admin = getUserData?.email === 'admin@gmail.com';

export const userRole = {
  superAdmin,
  admin,
}
