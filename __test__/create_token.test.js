
const handler_create_token = require('../src/functions/create_token/handler');

test('correct greeting is generated', () => {
    expect(handler_create_token.main.getLocalGreeting("en")).toBe("Hello!");
    expect(handler_create_token.main.getLocalGreeting("fr")).toBe("🌊");
});