// Array
var members = ['egoing', 'k8805', 'hoya'];
console.log(members[1]);
var i = 0;
while(i < members.length){
    console.log('array loop =>', members[i]);
    i += 1;
}

// Object
var roles = {
    'programmer':'egoing',
    'designer':'k8805',
    'manager':'hoya'
}
console.log(roles.designer); //kk8805

for (var name in roles){ //키값: roles[name]
    console.log('object =>', name, 'value =>', roles[name]);
}