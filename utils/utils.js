const userNotFound = (response) => {
  response.statusCode = 404;
  response.setHeader('Content-Type', 'text/plain');
  response.end('User not found');
}

const getHtmlBlock = ({ message, name, email, hobbies }) => `
<div style="gap: 10px; display: flex; flex-direction: column;">
  <div>${message} ${name}:</div>
  <div style="border: 1px solid gold">
    ${!!name ? `<div>name: ${name}</div>` : ''}
    ${email ? `<div>email: ${email}</div>` : ''}
    ${!!hobbies ? `<div>hobbies: ${hobbies}</div>`: ''}
  </div>
</div>`;

module.exports = {
  userNotFound,
  getHtmlBlock,
}
