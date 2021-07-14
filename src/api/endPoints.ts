const endPoints = {
    getTags: '/tags',
    getCategories: '/categories',
    getBlogList: 'posts?_embed&per_page=${perPageCards}&page=${pageNumber}',
    getBlogWithId: 'posts',
    getAutor: 'users'
}

export default endPoints;