module.exports = class {
    id;
    title;
    description;
    owner;
    picture;
    likeCount
    createdAt;
    constructor(project){
        this.id=project.id;
        this.title=project.title;
        this.description=project.description;
        this.owner=project.owner;
        this.picture=project.picture;
        this.likeCount=project.likeCount;
        this.createdAt=project.createdAt;
    }
} 