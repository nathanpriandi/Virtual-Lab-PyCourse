import API_BASE_URL from '../apiConfig';

const generateAvatarDataUri = (name) => {
  const getInitials = (name) => {
    const words = name.split(' ');
    if (words.length > 1) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getBackgroundColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, 65%, 50%)`;
  };

  const initials = getInitials(name || '??');
  const backgroundColor = getBackgroundColor(name || 'Default');

  const svgString = `
    <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${backgroundColor}" />
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="60" fill="#ffffff" text-anchor="middle" dy=".3em">
        ${initials}
      </text>
    </svg>
  `;

  const encodedSvg = encodeURIComponent(
    svgString.replace(/\s+/g, ' ').trim()
  );

  return `data:image/svg+xml,${encodedSvg}`;
};

export const getAvatarSrc = (user) => {
  if (user && user.avatar) {
    return `${API_BASE_URL}/uploads/${user.avatar}`;
  }
  return generateAvatarDataUri(user ? user.username : '');
};
