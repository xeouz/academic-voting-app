let all_posts = ["Head Boy", "Head Girl", "Cultural Captain", "Cultural Vice-Captain", "Sports Captain", "Sports Vice-Captain"];
["Red", "Blue", "Green", "Yellow"].forEach((val) => {
    all_posts = all_posts.concat([val+" House Captain", val+" House Vice-Captain"]);
})
let data = {}
all_posts.forEach((val) => {
    data[val] = [];
})

function randomInteger(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function addStudent(post_name, student_name, student_image)
{
    let student = {
        name: student_name,
        image: student_image,
    };

    data[post_name].push(student);
}

function createSampleStudents()
{
    data['Password'] = "test123";
    data['DataPassword'] = "data123";
    for(let i=0; i<all_posts.length; ++i)
    {
        let post = all_posts[i];
        let name;
        if(i%2 == 0)
        {
            name = 'Neerav Takker';
        }
        else
        {
            name = 'Manas Sarungbam';
        }
        image = 'test'+randomInteger(1, 5)+'.jpg';

        for(let i=0; i<randomInteger(3,10); ++i)
        {
            addStudent(post, name+i.toString(), 'test'+randomInteger(1, 5)+'.jpg');
        }
    }
}

createSampleStudents();

let json = JSON.stringify(data, null, '\t');
const fs = require('fs');
fs.writeFile('student-list.json', json, (error) => {
    if(error) throw error;
})