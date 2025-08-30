export default class UserModel {
    id;
    login;
    password;
    avatar;
    firstName;
    lastName;
    email;
    address;
    cart;
    constructor(newUser) {
        this.id = newUser.id;
        this.login = newUser.login;
        this.password = newUser.password;
        this.email = newUser.email || '';
        this.cartId = newUser.cart;
        this.avatar = '';
        this.address = '';
        this.firstName = '';
        this.lastName = '';
    }
}
