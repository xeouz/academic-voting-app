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
addStudent(post, 'Daksh Baghla', 'daksh-baghla.jpeg');
addStudent(post, 'Ashok Patel', 'ashok-patel.jpeg');
addStudent(post, 'Mithil Pandya', 'mithil-pandya.jpeg');

// Head Girl
post = 'Head Girl'
addStudent(post, 'Shanaya Sharma', 'shanaya-sharma.jpeg');
addStudent(post, 'Ananya Adhav', 'ananya-adhav.jpeg');
addStudent(post, 'Eshta Viccajee', 'eshta-viccajee.jpeg');

// Cultural Captain
post = 'Cultural Captain'
addStudent(post, 'Krishiv Rajan', 'krishiv-rajan.jpeg');
addStudent(post, 'Yug Srivastava', 'yug-srivastava.jpeg');
addStudent(post, 'Shubhalina Mitra', 'shubhalina-mitra.jpeg');

// Cultural Vice-Captain
post = 'Cultural Vice-Captain'
addStudent(post, 'Kanishk Shivkumar', 'kanishk-shivkumar.jpeg');
addStudent(post, 'Sarakshi Vyas', 'sarakshi-vyas.jpeg');
addStudent(post, 'Mariyah Sanchawala', 'mariyah-sanchawala.jpeg');
addStudent(post, 'Faiz Sayed', 'faiz-sayed.jpeg');
addStudent(post, 'Aarnavi Deshmukh', 'aarnavi-deshmukh.jpeg');
addStudent(post, 'Jeet Bhaskar', '');

// Sports Captain
post = 'Sports Captain'
addStudent(post, 'Drishti Iyer', 'drishti-iyer.jpeg')
addStudent(post, 'Meet Gosavi', 'meet-gosavi.jpeg')
addStudent(post, 'Kshitij Shyam', 'kshitij-shyam.jpeg')

// Sports Vice-Captain
post = 'Sports Vice-Captain'
addStudent(post, 'Shaligram Shirgaonkar', 'shaligram-shirgaonkar.jpeg')
addStudent(post, 'Hussain Patel', 'hussain-patel.jpeg')
addStudent(post, 'Shlok Gandhi', 'shlok-gandhi.jpeg')
addStudent(post, 'Amrut Jampana', 'amrut-jampana.jpeg')
addStudent(post, 'Chelena Pandian', 'chelena-pandian.jpeg')
addStudent(post, 'Hemant Kumawat', 'hemant-kumawat.jpeg')

// Red House Captain
post = 'Red House Captain'
addStudent(post, 'Aarush Sharma', 'aarush-sharma.jpeg')
addStudent(post, 'Zuhaa Bori', 'zuhaa-bori.jpeg')
addStudent(post, 'Imaad Nazish', 'imaad-nazish.jpeg')
addStudent(post, 'Shruti Joshi', 'shruti-joshi.jpeg')
addStudent(post, 'Ria Sharma', 'ria-sharma.jpeg')
addStudent(post, 'Aarav Viccajee', 'aarav-viccajee.jpeg')
addStudent(post, 'Preet Patel', 'preet-patel.jpeg')
addStudent(post, 'Ishita Singh', 'ishita-singh.jpeg')

// Red House Vice-Captain
post = 'Red House Vice-Captain'
addStudent(post, 'Aryan Sehgal', 'aryan-sehgal.jpeg')
addStudent(post, 'Akshara Kumari', 'akshara-kumari.jpeg')
addStudent(post, 'Soumya Singh', 'soumya-singh.jpeg')
addStudent(post, 'Viraj Patne', 'viraj-patne.jpeg')
addStudent(post, 'Kartiki Belwate', 'kartiki-belwate.jpeg')
addStudent(post, 'Gargee Shirke', 'gargee-shirke.jpeg')
addStudent(post, 'Moinnuddin Shaikh', 'moinuddin-shaikh.jpeg')

// Blue House Captain
post = 'Blue House Captain'
addStudent(post, 'Atharva Deshmukh', 'atharva-deshmukh.jpeg')
addStudent(post, 'Suraj Dube', 'suraj-dube.jpeg')
addStudent(post, 'Vishwa Patel', 'vishwa-patel.jpeg')
addStudent(post, 'Om Shinde', 'om-shinde.jpeg')
addStudent(post, 'Hazel Thakker', 'hazel-thakker.jpeg')
addStudent(post, 'Dia Jhalani', 'dia-jhalani.jpeg')

// Blue House Vice-Captain
post = 'Blue House Vice-Captain'
addStudent(post, 'Bhaargav Devangam', 'bhaargav-devangam.jpeg')
addStudent(post, 'Deep Patil', 'deep-patil.jpeg')
addStudent(post, 'Sanika Gowda', 'sanik-gowda.jpeg')
addStudent(post, 'Ananya Dodamani', 'ananya-dodamani.jpeg')
addStudent(post, 'Shreyas Rode', 'shreyas-rode.jpeg')
addStudent(post, 'Trinabh Singh', 'trinabh-singh.jpeg')
addStudent(post, 'Avi Sharma', 'avi-sharma.jpeg')
addStudent(post, 'Murtaza Tinwala', 'murtuza-tinwala.jpeg')

// Green House Captain
post = 'Green House Captain'
addStudent(post, 'Mohammed Ihsaan', 'mohammed-ihsaan.jpeg')
addStudent(post, 'Sadhvi Patil', 'sadhvi-patil.jpeg')
addStudent(post, 'Diya Malu', 'diya-malu.jpeg')
addStudent(post, 'Asthha Sardey', 'asttha-sardey.jpeg')

// Green House Vice-Captain
post = 'Green House Vice-Captain'
addStudent(post, 'Harshvardhan Patil', 'harshavardhan-patil.jpeg')
addStudent(post, 'Aditri Naru', 'aditra-naru.jpeg')
addStudent(post, 'Armaan Sekhon', 'armaan-sekhon.jpeg')
addStudent(post, 'Pratik Narayanan', 'pratik-narayanan.jpeg')
addStudent(post, 'Janhavi Shelke', 'janhavi-shelke.jpeg')

// Yellow House Captain
post = 'Yellow House Captain'
addStudent(post, 'Yohan Kurien', 'yohan-kurien.jpeg')
addStudent(post, 'Heetnya Patel', 'heetnya-patel.jpeg')
addStudent(post, 'Pragya Gupta', 'pragya-gupta.jpeg')

// Yellow House Vice-Captain
post = 'Yellow House Vice-Captain'
addStudent(post, 'Varoon Vazirani', 'varoon-vazirani.jpeg')
addStudent(post, 'Sudhanshu Singh', 'sudhanshu-singh.jpeg')
addStudent(post, 'Vedaang Prabhutendolkar', 'vedaang-prabhutendolkar.jpeg')
addStudent(post, 'Gauri Singh', 'gauri-singh.jpeg')
addStudent(post, 'Diptisha Jana', '')
addStudent(post, 'Advait Jadhav', 'advait-jadhav.jpeg')

data['Password'] = "test123";
data['DataPassword'] = "data123";

let json = JSON.stringify(data, null, '\t');
const fs = require('fs');
fs.writeFile('student-list.json', json, (error) => {
    if(error) throw error;
})