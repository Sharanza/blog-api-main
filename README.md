# Blog-API

This is the back-end api for the Odin Project blog project. It handles full CRUD functionality and local authentication for a front-end blog app.

---

## Technologies Used

This api is written in typescript with express. It manages a MongoDB Atlas database using mongoose. It uses jsonwebtoken to authenticate users and joi to validate input.

---

## Functionality

This app handles all of the back-end database management and authentication for the front-end react app where users can write, edit, publish, and delete posts for the blog. Authentication is handled by issuing json web tokens and then verifying that the user has a valid unexpired token before allowing writing, editing, and deleting actions.