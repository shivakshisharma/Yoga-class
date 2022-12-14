Yoga Class 
First page is Welcome page:The button is there to get started to the yoga classes
Second page:-The user signup/login page and if the password is forgot then another page to resset the password
the signup page has fields:-Name,email,password,confirm password,batch select option,DOB
The age constraint is applied here the user above 18 and below 65 can only register
The age is calulated using the logic DOB is accepts as the input in the DOB feild in the form and the age is caculated and the error is prompted if the age is not within the limits 
The Batch is taken as input from the user.
The Password is encypted using the jwt tokey key
the Jwt is used for the ecryption ofthe password as the password is passed in the plain text format.
The user have to verify for the Login 
The email is send to the registered user email,he can click the link and open the url and verify it.
After that he can login successfully.
If he forgots then he can rest hsi password too.
After the Login the user profile page is made.
The user details about his profile is shown and the batch is also shown in which he is regitered.
The payment array list is send to the database of that person.
The total number of months spent is calculated using the month now and the joining month.
If there is no due payment according to the algorithm then the same message shows up

