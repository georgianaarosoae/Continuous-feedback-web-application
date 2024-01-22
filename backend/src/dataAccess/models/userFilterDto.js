import paginationDto from "./paginationDto.js";

class userFilterDto extends paginationDto{
    
    constructor(obj){
        super()
        this.userName=null;
        this.email=null;
        if(obj){
            if(obj.hasOwnProperty('UserName')&&(typeof obj.userName==="string"||obj.userName===null)){
                this.userName=obj.userName;
            }
            if(obj.hasOwnProperty("Email")&&(typeof obj.email==="string"||obj.email===null)){
                this.email=obj.email;
            }
        }
        Object.assign(this,obj);
        this.setTakeAndSkip(this.take,this.skip)
    }
}
export default userFilterDto;