export const parseRequestUrl = () => {
  // This get the URL
  const url = document.location.hash.toLowerCase();
  // Splits the URL up in individual values
  const request = url.split('/');
  // We are returning parts of the URL

  return {
    resource: request[1],
    id: request[2],
    action: request[3],
  };
};

export const rerender = async (component) => {
  document.getElementById(
    'main-container'
  ).innerHTML = await component.render();
  await component.after_render();
};