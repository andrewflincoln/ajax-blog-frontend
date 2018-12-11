window.addEventListener('DOMContentLoaded', () => { 
    let curPostId = 0
 
    renderSideBar()

    document.addEventListener('click', (e) => {
        if(e.target.matches('#publish-btn')) {
            e.preventDefault()
            publishPost()
        }
        if (e.target.matches('.list-group-item')) {
            curPostId = e.target.id
            showPost(curPostId)
        }
        if (e.target.matches('.delete')) {
            deletePost(curPostId)  
        }
        if (e.target.matches('#new-post-btn')) {
            location.reload()
        }
        if (e.target.matches('.edit')) {
            getForEdit(curPostId)
        }
        if (e.target.matches('#update-btn')) {
            e.preventDefault()
            editPost(curPostId)
        }
    })
})