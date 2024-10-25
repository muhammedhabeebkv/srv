export interface User {
	_id: string;
	loggedIn: boolean;
	username: string;
	fname: string;
	lname: string;
	dateOfBirth: Date;
	gender: "male" | "female" | "non-binary";
	mobile: number;
	email: string;
	aadhar: string;
	address: string;
	district: string;
	state: string;
	pincode: number;
	country: string
	guardian_name: string;
	guardian_number: number;
}