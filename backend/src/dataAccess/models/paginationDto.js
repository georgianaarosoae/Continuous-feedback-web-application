class paginationDto {
    constructor() {
        this.take = null;
        this.skip = null;
    }

    setTakeAndSkip(take,skip){
        if(typeof take==="number"||take===null){
            this.take=take;
        }
        if(typeof skip==="number"||skip===null){
            this.skip=skip;
        } 
    }
}

export default paginationDto;
