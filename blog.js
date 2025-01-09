import readline from 'readline';  // Import readline module for user input
import fs from 'fs';  // Import fs (file system) module to read and write files

// Create readline interface for reading input from the terminal
const rl = readline.createInterface({
    input: process.stdin,  // Input comes from the standard input (keyboard)
    output: process.stdout  // Output goes to the standard output (console)
});

// Blog storage file where blog posts will be saved
const fileName = 'blogs.json';

function formatName(name) {
    if (!name) return ""; // Handle empty input
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(); // Capitalize the first letter and lowercase the rest
}

// Function to ask a question and return the answer as a Promise
function question(query) {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer.trim());  // Trim any extra spaces from the answer
        });
    });
}

// Function to load posts from the 'blogs.json' file. If the file doesn't exist, return an empty array
function loadPost() {
    if (fs.existsSync(fileName)) {
        const data = fs.readFileSync(fileName, "utf-8");  // Read the file content
        return JSON.parse(data);  // Parse the content as JSON and return it
    }
    return [];  // Return an empty array if the file doesn't exist
}

// Function to save posts to the 'blogs.json' file
function savePost(posts) {
    fs.writeFileSync(fileName, JSON.stringify(posts, null, 2));  // Write posts to file in a formatted JSON structure
}

// Validation function to check if the input is not empty
function Validation(input, fieldName) {
    if (!input) {  // If input is empty or undefined
        console.log(`${fieldName} cannot be empty.`);  // Show an error message
        return false;  // Return false to indicate the input is invalid
    }
    return true;  // Return true if input is valid
}

// Function to add a new blog post (this is an async function because it involves user interaction)
async function addPost() {
    let title, contents;

    // Ask for a valid title until the user provides a non-empty input
    do {
        title = await question("Enter the title of the blog: ");
    } while (!Validation(title, "Title"));

    // Ask for valid content until the user provides a non-empty input
    do {
        contents = await question("Enter the content of the blog: ");
    } while (!Validation(contents, "Content"));

    // Load existing posts from file
    const posts = loadPost();

    // Create a new post object with title, content, and current date
    const newPost = {
        id: posts.length + 1,  // Automatically assign a unique ID based on the current number of posts
        title,
        contents,
        date: new Date().toLocaleDateString()  // Format the current date as a string
    };

    // Add the new post to the list of posts
    posts.push(newPost);

    // Save the updated posts list back to the file
    savePost(posts);

    // Inform the user that the post has been successfully saved
    console.log("Your post has been saved successfully!");
}

// Function to view all blog posts
async function viewPosts() {
    const posts = loadPost();  // Fetch the posts
    if (posts.length === 0) {
        console.log("No blog post available");
    } else {
        console.log("All Blog Posts:");
        posts.forEach(post => {
            console.log(`\n[${post.id}] ${post.title}`);
            console.log(`Date: ${post.date}`);
            console.log(`Contents: ${post.contents}`);
        });
    }
}

// UPDATE - Edit an existing blog post
async function editPost() {
    const posts = loadPost();

    if (posts.length === 0) {
        console.log('No blog posts to edit.');
        rl.close();
        return;
    }

    posts.forEach((post) => {
        console.log(`[${post.id}] ${post.title}`);
    });

    const id = await question('Enter the ID of the post you want to edit: ');
    const postIndex = posts.findIndex((post) => post.id == id);

    if (postIndex === -1) {
        console.log('Blog post not found.');
        rl.close();
        return;
    }

    const newTitle = await question('Enter new title (leave blank to keep the same): ');
    const newContent = await question('Enter new content (leave blank to keep the same): ');

    if (newTitle) posts[postIndex].title = newTitle;
    if (newContent) posts[postIndex].contents = newContent;

    savePost(posts);
    console.log('Blog post updated successfully!');
    rl.close();
}

// Function to handle user actions
async function handleAction() {
    const action = await question("Would you like to add a new post, view all posts, or edit an existing post? (add/view/edit): ");
    if (action === 'add') {
        await addPost();  // Proceed to add a new post
    } else if (action === 'view') {
        await viewPosts();  // View all posts
    } else if (action === 'edit') {
        await editPost();  // Edit an existing post
    } else {
        console.log("Invalid option. Exiting...");
    }
    rl.close(); // Close the readline interface
}

// Main program execution
async function main() {
    const name = await question("What is your name? ");
    const formattedName = formatName(name); // Format the user's name
    console.log(`Hello, ${formattedName}! You are welcome to Blog CLI.`);  // Welcome message
    await handleAction(); // Handle user actions after the greeting
}

main(); // Run the main function
