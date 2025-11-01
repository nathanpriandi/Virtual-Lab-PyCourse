export const avatarIdentifiers = [
  'default',
  'cat',
  'dog',
  'panda',
  'robot',
  'ninja',
  'wizard',
  'pirate',
];

export const getAvatarUrl = (id) => {
  const baseUrl = 'https://api.dicebear.com/8.x/bottts/svg?seed=';
  return `${baseUrl}${id}`;
};