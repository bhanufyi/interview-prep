const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = (data) => {
  let errors = {};

data.handle = !isEmpty(data.handle) ? data.handle : "";
data.status = !isEmpty(data.status) ? data.status : "";
data.skills = !isEmpty(data.skills) ? data.skills : "";
  

if(!validator.isLength(data.handle,{min:2,max:40})){
    errors.handle = 'Handle needs to be between 2 and 40 characters';
}

if (validator.isEmpty(data.handle)) {
    console.log(data.handle);
  errors.handle = "Handle  field is required";
}

if (validator.isEmpty(data.status)) {
  errors.status = "Status field is required";
}

if(validator.isEmpty(data.skills)){
    errors.skills = 'Skills field is required';
}

if(!isEmpty(data.website)){
    if(!validator.isURL(data.website)){
        errors.website = 'Not a valid url';
    }
}

if (!isEmpty(data.youtube)) {
  if (!validator.isURL(data.youtube)) {
    errors.youtube = "Not a valid url";
  }
}

if (!isEmpty(data.facebook)) {
  if (!validator.isURL(data.facebook)) {
    errors.facebook = "Not a valid url";
  }
}

if (!isEmpty(data.twitter)) {
  if (!validator.isURL(data.twitter)) {
    errors.twitter = "Not a valid url";
  }
}


if (!isEmpty(data.linkedin)) {
  if (!validator.isURL(data.linkedin)) {
    errors.linkedin = "Not a valid url";
  }
}

if (!isEmpty(data.instagram)) {
  if (!validator.isURL(data.instagram)) {
    errors.instagram = "Not a valid url";
  }
}

//TODO validation

// if(!isEmpty(data.codechef)){
  
//   errors.codechef = "Not a valid codechef username";

// }

// if (!isEmpty(data.leetcode)) {
//   errors.leetcode = "Not a valid leetcode username";
// }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
