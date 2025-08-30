export default class UserDto {
    login;
    avatar;
    firstName;
    lastName;
    email;
    address;
    cartId;
    constructor(model) {
        this.login = model.login;
        this.avatar = model.avatar;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.email = model.email;
        this.address = model.address;
        this.cartId = model.cartId;
    }
}
