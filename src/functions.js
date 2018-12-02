
function publishPost() {
    let titleField = document.getElementById('title-field')
    let postField = document.getElementById('post-field')
    axios.post('http://localhost:3000/blogposts', {"title": `${titleField.value}`, "content": `${postField.value}`})
        .then(response => {
            let alertSection = document.getElementById('alert-section')    
            if (response.data.error) {
                alertSection.innerHTML = ` 
                    <br></br>
                    <div class="alert alert-danger" role="alert">
                    <strong>Error:</strong>    ${response.data.error.message}
                    </div>`
            } else {
            renderSideBar()
            curPostId = response.data.id
            displayContainer.innerHTML = `
            <h1>Post "${response.data.title}" created!</h1>`
            }
        })
        .catch(() => {
            throw {error: {status: 500, message: "Could not create post."}} 
        })  
}

function renderSideBar() {
    axios.get('http://localhost:3000/blogposts')
        .then(response => {
            let sideBar = document.getElementById('post-list')
            sideBar.innerHTML = ''
            for (let i of response.data) {
                let newSide = document.createElement('BTN')
                
                newSide.classList="list-group-item btn btn-secondary"
                newSide.id=i.id
                newSide.innerHTML = i.title
                sideBar.appendChild(newSide)
            }
        }).catch(() => {
            throw {error: {status: 500, message: 'Could not load posts'}}
        })
}

function showPost(id) {
    axios.get(`http://localhost:3000/blogposts/${id}`)
    .then(response => {
        let displayContainer = document.getElementById('display-container')
        displayContainer.innerHTML = `
        <h1>${response.data.title}</h1><br>
        <span>${response.data.content}</span><br><br>
        <btn class='btn btn-primary edit'>Edit</btn>
        <btn class='btn btn-primary delete'>Delete</btn 
        `
    })
    .catch(() => {
        throw {error: {status: 500, message: "Could not retrieve that post."}}
    })
}

function deletePost(id) {
  axios.delete(`http://localhost:3000/blogposts/${id}`)
  .then(() => {
        renderSideBar()
        let displayContainer = document.getElementById('display-container')
        displayContainer.innerHTML = `<h1>Post deleted.</h1>`
  })
  .catch(() => {
      throw {error: {status: 500, message: "Could not delete post."}}
  })
}

//populates fields for edit
function getForEdit(id) {
    axios.get(`http://localhost:3000/blogposts/${id}`)
     .then(response => {
        let displayContainer = document.getElementById('display-container')
        displayContainer.innerHTML = `
        <form>
        <label for="title">Title:</label><br>
        <input name="title" id="title-field" class="form-control input-sm" id="title-entry" value="${response.data.title}"></input>
        <br>
        <label for="post-field">Post:</label>
        <textarea name='post-field' id="post-field" class="form-control input-lg col-md-12">${response.data.content}</textarea> <br><br>
        <button id='update-btn' class="btn btn-primary" >Update post</button>            
        </form>
        <br><div id="alert-section"></div>        
        `   
     })
     .catch(() => {
         throw {error: {status: 500, message: "Cannot retrieve post"}}
     })
}


//Completing the edit
function editPost(id) {
   let titleField = document.getElementById('title-field')
   let postField = document.getElementById('post-field')
   axios.put(`http://localhost:3000/blogposts/${id}`, {"title": `${titleField.value}`, "content": `${postField.value}`})
    .then(response => {
        if (response.data.error) {
            let alertSection = document.getElementById('alert-section')  
            alertSection.innerHTML = ` 
                <br></br>
                <div class="alert alert-danger" role="alert">
                <strong>Error:</strong>    ${response.data.error.message}
                </div>`
        } else {
            renderSideBar()
            let displayContainer = document.getElementById('display-container')
            displayContainer.innerHTML = `
            <h1>${response.data.title}</h1><br>
            <span>${response.data.content}</span><br><br>
            <btn class='btn btn-primary edit'>Edit</btn>
            <btn class='btn btn-primary delete'>Delete</btn>
            <br>
                    <div id="alert-section"></div>     
            `
        }
    })
    .catch(() => {
      throw {error: {status: 500, message: "Could not edit that post"}}
    })
}

