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

        for(let i=0; i<randomInteger(3,10); ++i)
        {
            addStudent(post, name+i.toString(), 'test'+randomInteger(1, 5)+'.jpg');
        }
    }
}

let post;

// Head Boy
post = 'Head Boy'
addStudent(post, 'Aditya Malik', 'test1.jpg');
addStudent(post, 'Daksh Baghla', 'test2.jpg');
addStudent(post, 'Ashok Patel', 'test3.jpg');
addStudent(post, 'Mithil Pandya', 'test4.jpg');

// Head Girl
post = 'Head Girl'
addStudent(post, 'Shanaya Sharma', 'test4.jpg');
addStudent(post, 'Ananya Adhav', 'test3.jpg');
addStudent(post, 'Eshta Viccajee', 'test2.jpg');

// Cultural Captain
post = 'Cultural Captain'
addStudent(post, 'Krishiv Rajan', 'test2.jpg');
addStudent(post, 'Yug Srivastava', 'test5.jpg');
addStudent(post, 'Subhalina Mitra', 'test1.jpg');

// Cultural Vice-Captain
post = 'Cultural Vice-Captain'
addStudent(post, 'Kanishk Shivkumar', 'test4.jpg');
addStudent(post, 'Sarakshi Vyas', 'test1.jpg');
addStudent(post, 'Mariyah Sanchawala', 'test2.jpg');
addStudent(post, 'Faiz Sayed', 'test5.jpg');
addStudent(post, 'Aarnavi Deshmukh', 'test1.jpg');
addStudent(post, 'Jeet Bhaskar', 'test3.jpg');

// Sports Captain
post = 'Sports Captain'
addStudent(post, 'Drishti Iyer', 'test2.jpg')
addStudent(post, 'Meet Gosavi', 'test3.jpg')
addStudent(post, 'Ria Sharma', 'test5.jpg')
addStudent(post, 'Kshitij Shyam', 'test1.jpg')

// Sports Vice-Captain
post = 'Sports Vice-Captain'
addStudent(post, 'Shaligram Shirgaonkar', 'test1.jpg')
addStudent(post, 'Husain Patel', 'test3.jpg')
addStudent(post, 'Shlok Gandhi', 'test2.jpg')
addStudent(post, 'Ziyaad Momin', 'test5.jpg')
addStudent(post, 'Amrut Jampana', 'test4.jpg')
addStudent(post, 'Chelena Pandian', 'test2.jpg')
addStudent(post, 'Hemant Kumawat', 'test1.jpg')

// Red House Captain
post = 'Red House Captain'
addStudent(post, 'Aarush Sharma', 'test3.jpg')
addStudent(post, 'Zuhaa Bori', 'test2.jpg')
addStudent(post, 'Imaad Nazish', 'test1.jpg')
addStudent(post, 'Shruti Joshi', 'test4.jpg')
addStudent(post, 'Ria Sharma', 'test5.jpg')
addStudent(post, 'Aarav Viccajee', 'test2.jpg')
addStudent(post, 'Preet Patel', 'test4.jpg')
addStudent(post, 'Ishita Singh', 'test3.jpg')

// Red House Vice-Captain
post = 'Red House Vice-Captain'
addStudent(post, 'Aryan Sehgal', 'test5.jpg')
addStudent(post, 'Akshra Kumari', 'test2.jpg')
addStudent(post, 'Soumya Singh', 'test1.jpg')
addStudent(post, 'Viraj Patne', 'test3.jpg')
addStudent(post, 'Kartiki Belwate', 'test1.jpg')
addStudent(post, 'Gargee Shirke', 'test4.jpg')
addStudent(post, 'Moinnuddin Shaikh', 'test3.jpg')

// Blue House Captain
post = 'Blue House Captain'
addStudent(post, 'Atharva Deshmukh', 'test5.jpg')
addStudent(post, 'Suraj Dube', 'test4.jpg')
addStudent(post, 'Vishwa Patel', 'test4.jpg')
addStudent(post, 'Om Shinde', 'test3.jpg')
addStudent(post, 'Hazel Thakker', 'test2.jpg')
addStudent(post, 'Dia Jhalani', 'test1.jpg')

// Blue House Vice-Captain
post = 'Blue House Vice-Captain'
addStudent(post, 'Bhaargav Devangam', 'test2.jpg')
addStudent(post, 'Deep Patil', 'test3.jpg')
addStudent(post, 'Sanika Gowda', 'test4.jpg')
addStudent(post, 'Ananya Dodamani', 'test5.jpg')
addStudent(post, 'Shreyas Rode', 'test1.jpg')
addStudent(post, 'Trinabh Singh', 'test3.jpg')
addStudent(post, 'Avi Sharma', 'test2.jpg')
addStudent(post, 'Murtaza Tinwala', 'test4.jpg')

// Green House Captain
post = 'Green House Captain'
addStudent(post, 'Amrut Jampana', 'test2.jpg')
addStudent(post, 'Mohammed Ihsaan', 'test4.jpg')
addStudent(post, 'Sadhvi Patil', 'test3.jpg')
addStudent(post, 'Diya Malu', 'test5.jpg')
addStudent(post, 'Asthha Sardey', 'test1.jpg')

// Green House Vice-Captain
post = 'Green House Vice-Captain'
addStudent(post, 'Harshvardhan Patil', 'test2.jpg')
addStudent(post, 'Aditri Naru', 'test5.jpg')
addStudent(post, 'Armaan Sekhon', 'test1.jpg')
addStudent(post, 'Pratik Narayanan', 'test3.jpg')
addStudent(post, 'Sharanya Yadav', 'test2.jpg')
addStudent(post, 'Janhavi Shelke', 'test1.jpg')

// Yellow House Captain
post = 'Yellow House Captain'
addStudent(post, 'Yohan Kurien', 'test1.jpg')
addStudent(post, 'Heetnya Patel', 'test2.jpg')
addStudent(post, 'Pragya Gupta', 'test3.jpg')

// Yellow House Vice-Captain
post = 'Yellow House Vice-Captain'
addStudent(post, 'Varoon Vazirani', 'test5.jpg')
addStudent(post, 'Sudhanshu Singh', 'test4.jpg')
addStudent(post, 'Vedang Prabhutendolkar', 'test3.jpg')
addStudent(post, 'Gauri Singh', 'test2.jpg')
addStudent(post, 'Diptisha Jana', 'test1.jpg')
addStudent(post, 'Advait Jadhav', 'test4.jpg')

data['Password'] = "test123";
data['DataPassword'] = "data123";

let json = JSON.stringify(data, null, '\t');
const fs = require('fs');
fs.writeFile('student-list.json', json, (error) => {
    if(error) throw error;
})