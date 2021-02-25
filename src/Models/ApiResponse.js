export default class ApiResponse{
    static createSuccess(data){
        return new ApiResponse(true, data);
    }

    static createError(errorMessage){
        return new ApiResponse(false, null, errorMessage);
    }

    constructor(success, data, errorMessage = ""){
        this.success = success;
        this.data = data;
        this.errorMessage = errorMessage;
    }
}