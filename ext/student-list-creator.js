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
            addStudent(post, name+i.toString(), 'test'+randomInteger(1, 5)+'.jpeg');
        }
    }
}

let post;

// Head Boy
post = 'Head Boy'
addStudent(post, 'Aditya Malik', 'aditya-malik.jpeg');
addStudent(post, 'Daksh Baghla', '');
addStudent(post, 'Ashok Patel', '');
addStudent(post, 'Mithil Pandya', '');

// Head Girl
post = 'Head Girl'
addStudent(post, 'Shanaya Sharma', 'shanaya-sharma.jpeg');
addStudent(post, 'Ananya Adhav', '');
addStudent(post, 'Eshta Viccajee', '');

// Cultural Captain
post = 'Cultural Captain'
addStudent(post, 'Krishiv Rajan', 'krishiv-rajan.jpeg');
addStudent(post, 'Yug Srivastava', '');
addStudent(post, 'Subhalina Mitra', '');

// Cultural Vice-Captain
post = 'Cultural Vice-Captain'
addStudent(post, 'Kanishk Shivkumar', '');
addStudent(post, 'Sarakshi Vyas', '');
addStudent(post, 'Mariyah Sanchawala', '');
addStudent(post, 'Faiz Sayed', '');
addStudent(post, 'Aarnavi Deshmukh', '');
addStudent(post, 'Jeet Bhaskar', '');

// Sports Captain
post = 'Sports Captain'
addStudent(post, 'Drishti Iyer', '')
addStudent(post, 'Meet Gosavi', 'meet-gosavi.jpeg')
addStudent(post, 'Ria Sharma', '')
addStudent(post, 'Kshitij Shyam', '')

// Sports Vice-Captain
post = 'Sports Vice-Captain'
addStudent(post, 'Shaligram Shirgaonkar', '')
addStudent(post, 'Husain Patel', '')
addStudent(post, 'Shlok Gandhi', '')
addStudent(post, 'Ziyaad Momin', '')
addStudent(post, 'Amrut Jampana', '')
addStudent(post, 'Chelena Pandian', '')
addStudent(post, 'Hemant Kumawat', 'hemant-kumawat.jpeg')

// Red House Captain
post = 'Red House Captain'
addStudent(post, 'Aarush Sharma', '')
addStudent(post, 'Zuhaa Bori', '')
addStudent(post, 'Imaad Nazish', '')
addStudent(post, 'Shruti Joshi', '')
addStudent(post, 'Ria Sharma', '')
addStudent(post, 'Aarav Viccajee', '')
addStudent(post, 'Preet Patel', '')
addStudent(post, 'Ishita Singh', '')

// Red House Vice-Captain
post = 'Red House Vice-Captain'
addStudent(post, 'Aryan Sehgal', 'aryan-sehgal.jpeg')
addStudent(post, 'Akshara Kumari', 'akshara-kumari.jpeg')
addStudent(post, 'Soumya Singh', '')
addStudent(post, 'Viraj Patne', 'viraj-patne.jpeg')
addStudent(post, 'Kartiki Belwate', 'kartiki-belwate.jpeg')
addStudent(post, 'Gargee Shirke', 'gargee-shirke.jpeg')
addStudent(post, 'Moinnuddin Shaikh', '')

// Blue House Captain
post = 'Blue House Captain'
addStudent(post, 'Atharva Deshmukh', '')
addStudent(post, 'Suraj Dube', '')
addStudent(post, 'Vishwa Patel', '')
addStudent(post, 'Om Shinde', '')
addStudent(post, 'Hazel Thakker', '')
addStudent(post, 'Dia Jhalani', '')

// Blue House Vice-Captain
post = 'Blue House Vice-Captain'
addStudent(post, 'Bhaargav Devangam', 'bhaargav-devangam.jpeg')
addStudent(post, 'Deep Patil', '')
addStudent(post, 'Sanika Gowda', 'sanik-gowda.jpeg')
addStudent(post, 'Ananya Dodamani', 'ananya-dodamani.jpeg')
addStudent(post, 'Shreyas Rode', 'shreyas-rode.jpeg')
addStudent(post, 'Trinabh Singh', '')
addStudent(post, 'Avi Sharma', 'avi-sharma.jpeg')
addStudent(post, 'Murtaza Tinwala', '')

// Green House Captain
post = 'Green House Captain'
addStudent(post, 'Amrut Jampana', '')
addStudent(post, 'Mohammed Ihsaan', 'mohammed-ihsaan.jpeg')
addStudent(post, 'Sadhvi Patil', '')
addStudent(post, 'Diya Malu', '')
addStudent(post, 'Asthha Sardey', '')

// Green House Vice-Captain
post = 'Green House Vice-Captain'
addStudent(post, 'Harshvardhan Patil', 'harshavardhan-patil.jpeg')
addStudent(post, 'Aditri Naru', '')
addStudent(post, 'Armaan Sekhon', '')
addStudent(post, 'Pratik Narayanan', 'pratik-narayanan.jpeg')
addStudent(post, 'Sharanya Yadav', '')
addStudent(post, 'Janhavi Shelke', '')

// Yellow House Captain
post = 'Yellow House Captain'
addStudent(post, 'Yohan Kurien', 'yohan-kurien.jpeg')
addStudent(post, 'Heetnya Patel', '')
addStudent(post, 'Pragya Gupta', '')

// Yellow House Vice-Captain
post = 'Yellow House Vice-Captain'
addStudent(post, 'Varoon Vazirani', 'varoon-vazirani.jpeg')
addStudent(post, 'Sudhanshu Singh', '')
addStudent(post, 'Vedang Prabhutendolkar', '')
addStudent(post, 'Gauri Singh', '')
addStudent(post, 'Diptisha Jana', '')
addStudent(post, 'Advait Jadhav', '')

data['Password'] = "test123";
data['DataPassword'] = "data123";

let json = JSON.stringify(data, null, '\t');
const fs = require('fs');
fs.writeFile('student-list.json', json, (error) => {
    if(error) throw error;
})