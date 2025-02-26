module.exports=class BaseErrors extends Error{
    status;
    errors;
    constructor(status,message,errors){
        super(message);
        this.status=status;
        this.errors=errors;
    }

    static BadRequest(message,errors=[]){
        return new BaseErrors(400,message,errors);
    }

    static NotFound(message,errors=[]){
        return new BaseErrors(404,message,errors);
    }

    static BadAuthorization(){
        return new BaseErrors(401,"Bad authorization");
    }
}