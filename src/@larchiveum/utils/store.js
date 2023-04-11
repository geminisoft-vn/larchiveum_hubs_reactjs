export default class Store {
	static getUser(){
		let user = window.localStorage.getItem('__larchiveum_user');
		try {
			user = JSON.parse(user);
		} catch (error) {
			user = {};
		}
		return user;
	}

	static setUser(user){
		window.localStorage.setItem('__larchiveum_user', JSON.stringify(user));
	}
}
