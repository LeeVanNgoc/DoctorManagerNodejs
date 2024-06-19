
import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
	try {
		let data = await db.User.findAll();
		console.log('-------------------------');
		console.log(data);
		console.log('-------------------------');
		return res.render('homePage.ejs', {
			data: JSON.stringify(data)
		});
	} catch (error) {
		console.log(error);
	}
}

let getAboutPage = (req, res) => {
	return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
	return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
	let message = await CRUDService.createNewUser(req.body);
	console.log(message);
	return res.send('post crud from crud');
}
// Quy tac object
// Object: {
// 	key: '',
// 	value: ''
// }
module.exports = {
	getHomePage: getHomePage,
	getAboutPage: getAboutPage,
	getCRUD: getCRUD,
	postCRUD: postCRUD
}