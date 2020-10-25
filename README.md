# PWC-API
## Description
This is a fully functional web application that
 organize the operation of managing employee data, login,
 employee efficiency, employee personal information, generate his salary which depends on his overtime work also this system has
 administration capabilities of adding new employee deleting employee and the employee can also view his page
 and can give feedback, ask for a pay-rise and take scheduled days off.
## Project features
An attendance management system that lets you track your employers.
Time off and vacation tracking that allows teams to easily request time off, view balances, and get approval.
## MiddleWare
- Basic authorization middleware leverages two npm modules: bcrypt and jsonwebtoken
- Custom built linkedIn OAuth middleware
- Custom built Bearer authentication middleware
- Custom built access control middleware
## Models
- This application has a dynamic Model constructor for re-usability and scalability
Mongoose
- This application uses the following method to create a new mongoose.Schema in the MongoDB DataBase. It is used to execute CRUD (create, read, update, and delete) operations on MongoDB documents.
 # UML
 ![UML](https://drive.google.com/file/d/1is__qU-8BdzAASmllEOSBl5J_iZWo1Yi/view?usp=sharing)

# Routes
### post('/signup')
* Provide username , password , email ,image , role type as JSON
>
>{
"username": "raghad",
"password": "123",
"email":"raghadalquran1@gmail.com",
"image":"hgfhkjk",
"role":"admin"
}
* Example Response (token) :
>> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFobGFtIiwiaWF0IjoxNTkyOTg4Nzc5LCJleHAiOjE1OTMwNzg3Nzl9.tngzogFBs3Gn6TlCQRMoN5IftKS4wqo1KGf3Ca_cdqM
### get('/admincheckuser')
* Check the user information by using bearer auth and send the token recieved from the sign up route
>> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFobGFtIiwiaWF0IjoxNTkyOTg4Nzc5LCJleHAiOjE1OTMwNzg3Nzl9.tngzogFBs3Gn6TlCQRMoN5IftKS4wqo1KGf3Ca_cdqM
*  Example Response  :
>
{
"_id": "5ef3146b5144010d442f0831",
 "username": "raghad",
"password": "$2b$05$NK5z1Fry1anq4N57KNnZmux8EYxtXIv0CLcuoqrbarMu.XquGUQXm",
"email": "raghadalquran1@gmail.com",
"image": "hgfhkjk",
"role": "user",
"_v":0
 }
### post('/accept')
* Admin can accept the user by using this rout and then add him to the schema
>
{
"_id": "5ef3146b5144010d442f0831",
 "username": "raghad",
"password": "$2b$05$NK5z1Fry1anq4N57KNnZmux8EYxtXIv0CLcuoqrbarMu.XquGUQXm",
"email": "raghadalquran1@gmail.com",
"image": "hgfhkjk",
"role": "user",
"position":"developer"
 }"username": "raghad",
"password": "$2b$05$NK5z1Fry1anq4N57KNnZmux8EYxtXIv0CLcuoqrbarMu.XquGUQXm",
"email": "raghadalquran1@gmail.com",
"image": "hgfhkjk",
"role": "user",
"position":"developer"
 }
 *  Example Response :
 >> 'user added to the admin schema'
### delete('/reject/:id')
* The admin can reject users from signing up to the system by using the id from the temprorary Database
* Example Response: 'User rejected by the admin' .
### post('/signin')
* The user can sign in to his own account with his user name and password
*  Example Response (token) :
> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFobGFtIiwiaWF0IjoxNTkyOTg4Nzc5LCJleHAiOjE1OTMwNzg3Nzl9.tngzogFBs3Gn6TlCQRMoN5IftKS4wqo1KGf3Ca_cdqM
### delete('/deleteuser/:id')
* The admin can delete users from by using the id from the database
* > Example Response: "Deleted"
### patch('/adminedit/:id')
* The admin can update any user's profile 
* > Example Response: "Updated"
### post('/adduser')
* U ser also can add user manually to the database by using this route
* >{"username": "raghad",
"password": "$2b$05$NK5z1Fry1anq4N57KNnZmux8EYxtXIv0CLcuoqrbarMu.XquGUQXm",
"email": "raghadalquran1@gmail.com",
"image": "hgfhkjk",
"role": "user",
"position":"developer"
 }
* Example Response:
>'Created'
### get('/getuserprofile')
* take admin token and return user information
> {
"_id": "5ef3146b5144010d442f0831",
 "username": "raghad",
"password": "$2b$05$NK5z1Fry1anq4N57KNnZmux8EYxtXIv0CLcuoqrbarMu.XquGUQXm",
"email": "raghadalquran1@gmail.com",
"image": "hgfhkjk",
"role": "user",
"position":"developer"
"_v":0
 }
### patch('/usereditprofile')
* By using this route user had the ability to update his profile .
>{
    "image":"new image"
}
* Example Response:
>'Updated'
### get('/userstart')
* * Using this route the user can register the time he started his work by taking the token using basic auth
* Example Response:
>{
    "_id": "5ef371601e39e90017335cd9",
    "username": "Raghad",
    "startTime": "9:29",
    "location": "location:longitud:40.748798 || longitud:-73.984596",
    "finishTime": 0,
    "workHours": 0,
    "date": "24/6/2020",
    "__v": 0
}
### get('/userend')
* Using this route the user can register the time he end his work by taking the token using basic auth
* Example Response:
>{
    "_id": "5ef371601e39e90017335cd9",
    "username": "Raghad",
    "startTime": "15:29",
    "location": "location:longitud:40.748798 || longitud:-73.984596",
    "finishTime": "15:30",
    "workHours": 0.02,
    "date": "24/6/2020",
    "__v": 0
}
# Testing
#### Testing with mockRequest
- jest
- eslint
- `npm run test` 
##### Tests all routes and their related CRUD operations
 ## Abdallah Obaid:[GitHub-link](https://github.com/Abdallah-Obaid)
