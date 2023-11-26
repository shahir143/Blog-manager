const form = document.getElementById('my-form');
const blogTitle = document.getElementById('title');
const blogAuthor = document.getElementById('author');
const blogContent = document.getElementById('content');
const blogArticles = document.getElementById('article');

form.addEventListener('submit', saveData);

async function saveData(e) {
    e.preventDefault();
    const blog = {
        title: blogTitle.value,
        author: blogAuthor.value,
        content: blogContent.value
    };

    try {
        const response = await axios.post('http://localhost:4000/blog/save-data', blog);
        const blogData = response.data;
        displayData(blogData);
    } catch (err) {
        console.log(err);
    }
}

function createHTMLElement(tag, className, textContent) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
}

async function displayData(data) {
    const li = createHTMLElement("li");
    const title = createHTMLElement('h1', 'title', data.title);
    const moreBtn = createHTMLElement('button', 'more', 'more Info');
    const drp = createHTMLElement('div', 'dropdown-content');
    drp.style.display = 'none';
    li.appendChild(title);
    li.appendChild(moreBtn);
    li.appendChild(drp);
    blogArticles.appendChild(li);
        
        moreBtn.addEventListener('click', () => {
            drp.style.display = drp.style.display === 'none' ? 'block' : 'none';
        });
        const author = createHTMLElement('h2', 'author', `AUTHOR : ${data.author}`);
        const contentcnt = createHTMLElement('h4', 'content', data.content);
        drp.appendChild(author);
        drp.appendChild(contentcnt);

        const formcnt = createHTMLElement('form', 'comments');
        const inputcnt = createHTMLElement('input');
        inputcnt.setAttribute('type', 'text');
        inputcnt.setAttribute('id', 'commentInput');

        const subtBtn = createHTMLElement('button', 'submit', 'Submit');
        const commentList = createHTMLElement('ul', 'commentList');

        formcnt.appendChild(inputcnt);
        formcnt.appendChild(subtBtn);
        drp.appendChild(commentList);
        drp.appendChild(formcnt);

        subtBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const BlogId = data.id; 

            try {
                const datacomment = {
                    blogId: BlogId,
                    comment: document.getElementById('commentInput').value,
                };

                const responseComment = await axios.post('http://localhost:4000/blog/comment-save', datacomment);
                const cntData = responseComment.data;
                console.log(cntData);
            } catch (err) {
                console.log(err);
            }
        });

        const commentData = await axios.get(`http://localhost:4000/blog/comment/${data.id}`);
        commentData.data.forEach((val) => {
            const newComment = createHTMLElement("li");
            const cntData = createHTMLElement('p', 'Content', val.comment);
            const deleteBtn = createHTMLElement('button', 'DELETE', 'DELETE');

            newComment.appendChild(cntData);
            newComment.appendChild(deleteBtn);
            
            commentList.appendChild(newComment);
            console.log(val.id);
            deleteBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                const target=e.target.parentElement;
                console.log(val.id)
                try {
                    await axios.delete(`http://localhost:4000/blog/delete-data/${val.id}`);
                    commentList.removeChild(target);
                } catch (e) {
                    console.log('Error deleting');
                }
            });
        });
    
}

document.addEventListener('DOMContentLoaded', loadDetails);

async function loadDetails() {
    try {
        const dbData = await axios.get('http://localhost:4000/blog/data');
        const usersData = dbData.data;
        if (usersData.length < 1) {
            console.log("No users");
        }

        usersData.forEach((userData) => {
            displayData(userData);
        });
    } catch (err) {
        console.log(err);
    }
}
