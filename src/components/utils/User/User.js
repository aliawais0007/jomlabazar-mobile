import SyncStorage from 'sync-storage';

export class User {

    setUsername(name) {
        SyncStorage.set("username", name);
    }

    getUsername() {
        return SyncStorage.get("username");
    }

    setName(name) {
        SyncStorage.set("name", name);
    }

    getName() {
        return SyncStorage.get("name");
    }

    setType(type) {
        SyncStorage.set("type", type);
    }

    getType() {
        return SyncStorage.get("type");
    }

    setId(id) {
        SyncStorage.set("id", id);
    }

    getId() {
        return SyncStorage.get("id");
    }

    setMail(mail) {
        SyncStorage.set("mail", mail);
    }

    getMail() {
        return SyncStorage.get("mail");
    }

    setNumber(number) {
        SyncStorage.set("number", number);
    }

    getNumber() {
        return SyncStorage.get("number");
    }

    setDealerId(id) {
        SyncStorage.set("dealer_id", id)
    }

    getDealerId() {
        return SyncStorage.get("dealer_id");
    }

    setUserId(id) {
        SyncStorage.set("user_id", id)
    }

    getUserId() {
        return SyncStorage.get("user_id");
    }

    setIsActive(flag) {
        SyncStorage.set("is_active", flag)
    }

    getIsActive() {
        return SyncStorage.get("is_active");
    }

    setSmsVerification(flag) {
        SyncStorage.set("sms_verification", flag)
    }

    getSmsVerification() {
        return SyncStorage.get("sms_verification");
    }

    isLogin() {
        return SyncStorage.get("isLogin");
    }

    setLogin(flag) {
        SyncStorage.set("isLogin", flag);
    }
    
    updateCart(item){
        SyncStorage.set("cartItems",item);
    }
}