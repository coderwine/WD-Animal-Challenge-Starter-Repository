**BRONZE CHALLENGE:**
- Implement a validate-session.js. 
- Use the validateSession to protect every route in the animal-controller.js.
- They should block any request that does not have an authorization header that bears a token.
- This token should be one returned from the login or sign up methods.
  
**SILVER CHALLENGE:**
- Add a new column named 'userId' to the animal model. 
- This column should take integers, and rows and this column should not be null. 
- Reset your database.
- Modify the '/create' endpoint to save the user from the request's id into the userId column.
- Make sure you sign up a new user and add your authorization header before you test.
 

**GOLD CHALLENGE:**
- Taking advantage of the new userId column that links the row of the animal table to the user that posted it from the Silver level challenge, modify the delete endpoint to only allow users to delete only their own animals from the database.
- You will need to use an options object similar to open used in the Sequelize update() method.
- Similarly, modify the get to return only animals the requesting user has posted.