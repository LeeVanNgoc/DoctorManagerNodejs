
import db from '../models/index';
import bcrypt from 'bcryptjs'

const e = require("express")

let handleUserLogin = (email, password) => {
	return new Promise(async (resolve, reject) => {
		try {
			let userData = {};
			let isExits = await checkUserEmail(email);
			if(isExits){
                //User already exist
				
				let user = await db.User.findOne({
					attributes: ['email', 'roleId', 'password'],
					where: {email : email},
					raw: true 
				});

				if(user) {
					// Compare password
					let check = await bcrypt.compareSync(password, user.password);
					if(check) {
						userData.errCode = 0;
						userData.errMessage = 'Ok';
						delete user.password,
						userData.user = user;
					} else {
						userData.errCode = 3;
                        userData.errMessage = `Password is incorrect`;
					}
				} else {
					userData.errCode = 2;
                    userData.errMessage = `User not found.`;
				}
            }else{
				userData.errCode = 1;
				userData.errMessage = `Your's email isn't exist in your system. Please try other email`;
            }
			resolve(userData)
		} catch (error) {
			reject(error)
		}
	})
}


let checkUserEmail = (userEmail) => {
	return new Promise(async (resolve, reject) => {
		try {
			let user = await db.User.findOne({
				where: {
					email: userEmail,
				}
			});

			if(user){
				resolve(true)
			}else{
				resolve(false)
			}
		} catch (error) {
			reject(error)
		}
    });
}

module.exports = {
	handleUserLogin: handleUserLogin,
}