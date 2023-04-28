import { Injectable, inject } from '@angular/core';
import { Database, get, push, ref, set } from '@angular/fire/database';
import { VjhsStorageService } from './vjhs-storage.service';
import { DataSnapshot, onValue } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class VjhsDatabaseService {
  private readonly database: Database = inject(Database);

  constructor(private storage: VjhsStorageService) { }

  private clearDataInner()
  {
    let studentList = this.storage.studentList;
    let posts = ["Head Boy", "Head Girl", "Cultural Captain", "Cultural Vice-Captain", "Sports Captain", "Sports Vice-Captain", "House Captain", "House Vice-Captain"];
    
    let data: any = {};
    data.version = 1;
    data.houses = {'red': {}, 'blue': {}, 'green': {}, 'yellow': {}};
    ['red', 'blue', 'green', 'yellow'].forEach(house_name => {
      posts.forEach(post_name => {
        let post_data = studentList[house_name][post_name];
        data.houses[house_name][post_name] = {};
        post_data.forEach((student: any) => {
          data.houses[house_name][post_name][student.name] = {
            grade_vi: {div_a: 0, div_b: 0, div_c: 0, div_d: 0, total:0},
            grade_vii: {div_a: 0, div_b: 0, div_c: 0, div_d: 0, total:0},
            grade_viii: {div_a: 0, div_b: 0, div_c: 0, div_d: 0, total:0},
            grade_ix: {div_a: 0, div_b: 0, div_c: 0, div_d: 0, total:0},
            grade_x: {div_a: 0, div_b: 0, div_c: 0, div_d: 0, total:0},
            total: 0,
          }
        });
      });
    });
    data.classes = {total: 0};
    ['vi', 'vii', 'viii', 'ix', 'x'].forEach(grade_name => {
      data.classes['grade_'+grade_name] = { 
        div_a: {votes: {length: 0}, total: 0}, 
        div_b: {votes: {length: 0}, total: 0}, 
        div_c: {votes: {length: 0}, total: 0}, 
        div_d: {votes: {length: 0}, total: 0}, 
        total:0 
      };
    });

    let full:any = {
      data: data,
      auth: {
        allow_red: true,
        allow_blue: true,
        allow_green: true,
        allow_yellow: true,
      }
    }

    const reference = ref(this.database, '/');
    set(reference, full);
  }
  clearData() {
    this.storage.retrieveStudentList(() => this.clearDataInner());
  }

  generateVoteString(): string
  {
    let result = "<";
    Object.keys(this.votePosts).forEach((post:any) => {
      if(this.votePosts[post] != undefined)
        result += post + ":" + this.votePosts[post]+ ", ";
    });
    result = result.slice(0, result.length-2);
    result += ">";
    return result;
  }

  private votePosts:any = {}
  private voteData = {grade: '', division: ''}
  getAllData()
  {
    const path = "/data";
    const reference = ref(this.database, path);

    get(reference)
    .then((snapshot) => {
      console.log(snapshot.val());
    })
    .then((err => {
      console.log(err);
    }))
  }
  selectVoteGrade(grade: string)
  {
    this.voteData.grade = grade;
  }
  selectVoteDivision(division: string)
  {
    this.voteData.division = division;
  }
  addVote(post: string, name: string)
  {
    this.votePosts[post] = name;
  }
  submitVote(house: string) {
    let grade = 'grade_'+this.voteData.grade.toLowerCase();
    let division = 'div_'+this.voteData.division.toLowerCase();
    house = house.toLowerCase();

    let path = "data/houses/"+house+"/";
    const reference = ref(this.database, path);
    const reference_class = ref(this.database, "data/classes/"+grade+"/");
    const reference_push = ref(this.database, "data/classes/"+grade+"/"+division+"/votes/");
    get(reference)
    .then((snapshot) => {
      const data = snapshot.val();
      
      Object.keys(this.votePosts).forEach((post:any) => {
        data[post][this.votePosts[post]][grade][division]++;
        data[post][this.votePosts[post]][grade]['total']++;
        data[post][this.votePosts[post]]['total']++;
      });

      set(reference, data);
    })
    .then(err => {
      console.log(err);
    });
    
    get(reference_class)
    .then((snapshot) => {
      const data = snapshot.val();
      data[division]['total']++;
      data['total']++;
      data[division]['votes']['length']++;

      set(reference_class, data);
      push(reference_push, this.generateVoteString());
    })
    .then(err => {
      console.log(err);
    });
  }
  setHouseAllowance(house: string, allow: boolean)
  {
    let path = "auth/allow_"+house.toLowerCase();
    const reference = ref(this.database, path);
    set(reference, allow);
  }
  addHouseListener(house: string, callback: CallableFunction)
  {
    let path = "auth/allow_"+house.toLowerCase();
    const reference = ref(this.database, path);

    onValue(reference, (snapshot: DataSnapshot) => {
      callback(snapshot);
    })
  }
}
