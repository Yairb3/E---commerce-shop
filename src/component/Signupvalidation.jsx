function Validation(name, email, password,age) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern=/^([@#](?=[^aeiou]{7,13}$)(?=[[:alnum:]]{7,13}$)(?=.*[A-Z]{1,}.*$).+)$/


    const uppercaseRegExp   = /(?=.*?[A-Z])/;
    const lowercaseRegExp   = /(?=.*?[a-z])/;
    const digitsRegExp      = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp   = /.{8,}/;
    const passwordLength =      password.length;
    const uppercasePassword =   uppercaseRegExp.test(password);
    const lowercasePassword =   lowercaseRegExp.test(password);
    const digitsPassword =      digitsRegExp.test(password);
    const specialCharPassword = specialCharRegExp.test(password);
    const minLengthPassword =   minLengthRegExp.test(password);
    
    if(name === "") {
        error.name = "Name should not be empty" 
       }     
   
    if(email === "") {
        error.email = "Email should not be empty" 
    }     
    else if(!email_pattern.test(email)) { 
        error.email = "Email Didn't match"    
    }
   
    if(password === "") {  
        error.password = "Password should not be empty" 
    } 
    else if(!uppercasePassword){
        error.password="At least one Uppercase";
    }else if(!lowercasePassword){
        error.password="At least one Lowercase";
    }else if(!digitsPassword){
        error.password="At least one digit";
    }else if(!specialCharPassword){
        error.password="At least one Special Characters";
    }else if(!minLengthPassword){
        error.password="At least minumum 8 characters";
    }
    if(age === ""){
        error.age= "Age should not be empty"
    }
      
    
    return error;
}
export default Validation;
