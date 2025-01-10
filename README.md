# Blog CLI Application

This is a simple command-line application that lets you manage blog posts. You can:

- Add a new blog post
- View all blog posts
- Edit an existing blog post
- Delete a blog post

The blog posts are saved in a `blogs.json` file.

## Installation

1. Clone the repository:

    git clone <repository-url>
    

2. Go to the project directory:

    cd <project-directory>


3. Install dependencies:

    npm install
    

4. (Optional) Install **Nodemon** to automatically restart the app during development:


    npm install -g nodemon


## How to Use

To start the app, run:

```bash
npm start
Follow the prompts to add, view, edit, or delete blog posts.

Features
Add Post: Enter a title and content for a new post.
View Posts: See a list of all blog posts.
Edit Post: Change the title or content of an existing post.
Delete Post: Remove a blog post by its ID.
File Storage
Blog posts are stored in a blogs.json file like this:

json
Copy code
[
  {
    "id": 1,
    "title": "First Blog Post",
    "contents": "This is the content of the first post.",
    "date": "01/01/2025"
  }
]
Scripts
start: Runs the app using Nodemon for automatic restarts.
json
Copy code
"scripts": {
  "start": "nodemon blog.js"
}
Dependencies
Nodemon: For auto-restarting the app during development.
fs: Built-in Node.js module to read/write files.
readline: Built-in Node.js module to handle user input in the terminal.
License
This project is open-source and licensed under the MIT License.

Contributing
Feel free to submit issues or pull requests for improvements!