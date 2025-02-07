import { users } from '../data/UserData';

export function authenticateUser(email, password, role) {
  return users.find(
    (user) =>
      user.email === email && user.password === password && user.role === role
  );
}

export function registerUser(name, email, password, role) {
  const newUser = { id: users.length + 1, name, email, password, role };
  users.push(newUser);
  return newUser;
}