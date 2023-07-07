function Validation(email, password) {
    let error = {}
    const email_pattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(email === "") {
        error.email = "Email should not be empty" 
    }     
    else if(!email_pattern.test(email)) 
    { 
        error.email = "Email Didn't match"    
    }
   
    if(password === "") {  
        error.password = "Password should not be empty" 
    }   
       
       return error;}
export default Validation;
