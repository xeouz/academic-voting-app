let houses = {'red': {}, 'blue': {}, 'green': {}, 'yellow': {}};

let all_posts = ["Head Boy", "Head Girl", "Cultural Captain", "Cultural Vice-Captain", "Sports Captain", "Sports Vice-Captain", "House Captain", "House Vice-Captain"];

function addPosts(house_name)
{
    for(let i=0; i<all_posts.length; ++i)
    {
        houses[house_name][all_posts[i]] = [];
    }
}

function addStudent(house_name, post_name, student_name, student_image)
{
    let student = {
        name: student_name,
        image: student_image,
    };

    houses[house_name][post_name].push(student);
}

function createSampleStudents()
{
    for(let i=0; i<all_posts.length; ++i)
    {
        let post = all_posts[i];
        let name;
        let image;
        if(i%2 == 0)
        {
            name = 'Neerav Takker';
            image = 'url(assets/test1.jpg)';
        }
        else
        {
            name = 'Manas Sarungbam';
            image = 'url(assets/test2.jpg)';
        }

        addStudent('red', post, name+"1", image);
        addStudent('red', post, name+"2", image);
        addStudent('red', post, name+"3", image);
        addStudent('red', post, name+"4", image);
        addStudent('blue', post, name+"1", image);
        addStudent('blue', post, name+"2", image);
        addStudent('blue', post, name+"3", image);
        addStudent('blue', post, name+"4", image);
        addStudent('green', post, name+"1", image);
        addStudent('green', post, name+"2", image);
        addStudent('green', post, name+"3", image);
        addStudent('green', post, name+"4", image);
        addStudent('yellow', post, name+"1", image);
        addStudent('yellow', post, name+"2", image);
        addStudent('yellow', post, name+"3", image);
        addStudent('yellow', post, name+"4", image);
    }
}

addPosts('red');
addPosts('blue');
addPosts('green');
addPosts('yellow');
createSampleStudents();

let json = JSON.stringify(houses, null, '\t');
const fs = require('fs');
fs.writeFile('student-list.json', json, (error) => {
    if(error) throw error;
})