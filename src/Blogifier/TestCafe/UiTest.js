import { ClientFunction, Selector } from 'testcafe';

var baseUrl = 'http://vps.qvistgaard.me:9888/admin/';

fixture`Getting Started`
    .page`http://vps.qvistgaard.me:9888/admin/register/`;

test('Register - Check if error messages are displaying when no information is entered', async t => {
    await t
      .click('#app > div > form > button')
      .expect(Selector('.validation-message').exists)
      .ok();
});

test("Register - Check if Passwords do not match show up", async t => {
    await t
        .typeText("#registerPassword", "testWithPassword1")
        .typeText("#registerConfirmPassword", "testWithPassword2")
        .click("#app > div > form > button")
        .expect(Selector("#app > div > form > div:nth-child(4) > div").innerText).eql("Passwords do not match")
});


test("Register - Test for redirection to login page", async t => {
    const getLocation = ClientFunction(() => document.location.href);

    await t
        .typeText("#registerEmail", "test"+Math.floor(Math.random() * 100)+"@user.one")
        .typeText("#registerName", "Test")
        .typeText("#registerPassword", "test123")
        .typeText("#registerConfirmPassword", "test123")
        .click("#app > div > form > button")
        .expect(getLocation()).contains(baseUrl + 'login')
});

test("Login - Test for error on incorrect credentials", async t => {
    await t
		.navigateTo(baseUrl + 'login')
        .typeText("#loginEmail", "wrong@email.com")
        .typeText("#loginPassword", "test123")
        .click("#app > div > form > button")
        .expect(Selector("#app > div > div").innerText).eql("Login failed, please try again.")
});


test("Login - Test for redirection to admin panel", async t => {
    const getLocation = ClientFunction(() => document.location.href);

    await t
		.navigateTo(baseUrl + 'login')
        .typeText("#loginEmail", "test@user.one")
        .typeText("#loginPassword", "test123")
        .click("#app > div > form > button")
    	.expect(getLocation()).contains(baseUrl)
});

