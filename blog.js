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
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();//capitalize username first letter and lowered the rest
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

    // Close the readline interface after the operation
    rl.close();
}

// view all the post
async function viewPosts() {
    const posts = loadPost();  // Fetch the posts;
    if(posts.length===0){
console.log(" No blog post available");
rl.close(); 
return
    }else{
        console.log("All Blog Posts");
        posts.forEach(post => {
           console.log(`\n[${post.id}] ${post.title}`);
           console.log(` Date: ${post.date}`);
           console.log(` Contents:  ${post.contents}`);

        });
    }
 
}


// Greet the user with a question to ask their name
rl.question("What is your name? ", (name) => {
     const formattedName = formatName(name); // Format the user's name
    console.log(`Hello, ${formattedName}! You are welcome to Blog CLI.`);  // Welcome message
    addPost();  // After greeting, proceed to ask for the blog post title and content
});
  // Ask the user what they want to do next
  rl.question("Would you like to add a new post or view all posts? (add/view): ", async (action) => {
    if (action === 'add') {
        await addPost();  // Proceed to add a new post
    } else if (action === 'view') {
        await viewPosts();  // View all posts
    } else {
        console.log("Invalid option. Exiting...");
        rl.close();
    }
});
