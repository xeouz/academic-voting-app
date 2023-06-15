import { Injectable, inject } from '@angular/core';
import { Database, get, push, ref, set } from '@angular/fire/database';
import { VjhsStorageService } from './vjhs-storage.service';
import { DataSnapshot, onValue } from 'firebase/database';
import * as excel from "exceljs";
import * as fs from 'file-saver';
import * as Color from 'color';

@Injectable({
  providedIn: 'root'
})
export class VjhsDatabaseService {
  private readonly database: Database = inject(Database);

  constructor(private storage: VjhsStorageService)
  {
    this.posts = ["Head Boy", "Head Girl", "Cultural Captain", "Cultural Vice-Captain", "Sports Captain", "Sports Vice-Captain"];
    ["Red", "Blue", "Green", "Yellow"].forEach((val) => {
      this.posts = this.posts.concat([val+" House Captain", val+" House Vice-Captain"]);
    })
  }

  posts: string[] = [];
  private getAuthDataTemplate()
  {
    return {
      allow_red: true,
      allow_blue: true,
      allow_green: true,
      allow_yellow: true,
      open_red: false,
      open_blue: false,
      open_green: false,
      open_yellow: false,
      fullscreen_red: false,
      fullscreen_blue: false,
      fullscreen_green: false,
      fullscreen_yellow: false,
    }
  }
  private clearDataInner()
  {
    let studentList = this.storage.studentList;
    
    let data: any = {};
    data.global_votes = {total: 0};
    this.posts.forEach((val) => {
      let candidates_data: any = {total: 0, nota: 0};
      studentList[val].forEach((candidate: any) => {
        candidates_data[candidate['name']] = 0;
      });
      data.global_votes[val] = candidates_data;
    });

    function createDivisions(divisions: string[]): any
    {
      let divs:any = {total:0};
      divisions.forEach((div) => {
        divs["div_"+div.toLowerCase()] = {total: 0, red:0, blue:0, green:0, yellow:0, votes: []};
      })
      return divs;
    }
    data.class_votes = {};
    data.class_votes["grade_vi"] = createDivisions(['a', 'b', 'c', 'd', 'e', 'f', 'g']);
    data.class_votes["grade_vii"] = createDivisions(['a', 'b', 'c', 'd', 'e']);
    data.class_votes["grade_viii"] = createDivisions(['a', 'b', 'c', 'd']);
    data.class_votes["grade_ix"] = createDivisions(['a', 'b', 'c']);
    data.class_votes["grade_x"] = createDivisions(['a', 'b', 'c']);
    data.class_votes["grade_xi"] = createDivisions(['a', 'b', 'c']);
    data.class_votes["grade_xii"] = createDivisions(['a', 'b', 'c']);

    let full:any = {
      data: data,
      auth: this.getAuthDataTemplate(),
    }

    const reference = ref(this.database, '/');
    set(reference, full);
  }
  clearData()
  {
    this.storage.retrieveStudentList(() => this.clearDataInner());
  }
  clearAuthData(house: string = "")
  {
    const path = "/auth";

    if(house == "")
      set(ref(this.database, path), this.getAuthDataTemplate());
    else
    {
      set(ref(this.database, path+'/allow_'+house.toLowerCase()), true);
      set(ref(this.database, path+'/open_'+house.toLowerCase()), false);
    }
  }

  generateVoteString(): string
  {
    let result = "<";
    Object.keys(this.votePosts).forEach((post:any) => {
      if(this.votePosts[post] == undefined)
        return;

      result += post + ":" + this.votePosts[post]+ ", ";
    });
    result = result.slice(0, result.length-2);
    result += ">";
    return result;
  }

  private votePosts:any = {}
  private voteData = {grade: '', division: ''}
  getPosts(): string[]
  {
    return this.posts;
  }
  getAllData(callback: CallableFunction)
  {
    const path = "/data";
    const reference = ref(this.database, path);

    get(reference)
    .then((snapshot) => {
      callback(snapshot);
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

    const reference_global = ref(this.database, "data/global_votes");
    const reference_class = ref(this.database, "data/class_votes/"+grade+"/");
    const reference_push = ref(this.database, "data/class_votes/"+grade+"/"+division+"/votes/");
    get(reference_global)
    .then((snapshot) => {
      const data = snapshot.val();
      
      Object.keys(this.votePosts).forEach((post:any) => {
        let post_name = post;
        if (post == "House Captain" || post == "House Vice-Captain")
          post_name = house + " " + post;
        
        if(this.votePosts[post] == 'NOTA')
        {
          data[post_name]['nota']++;
          data[post_name]['total']++;
          data['total']++;
          return;
        }

        data[post_name][this.votePosts[post]]++;
        data[post_name]['total']++;
        data['total']++;
      });

      set(reference_global, data);
    })
    .then(err => {
      if (err == null) return;
      console.log(err);
    });
    
    get(reference_class)
    .then((snapshot) => {
      const data = snapshot.val();
      data[division]['total']++;
      data[division][house.toLowerCase()]++;
      data['total']++;

      set(reference_class, data);
      push(reference_push, house+" House: "+this.generateVoteString());
    })
    .then(err => {
      if (err == null) return;
      console.log(err);
    });
  }
  setHouseAllowance(house: string, allow: boolean)
  {
    let path = "auth/allow_"+house.toLowerCase();
    const reference = ref(this.database, path);
    set(reference, allow);
  }
  setHouseFullscreen(house: string, fullscreen: boolean)
  {
    let path = "auth/fullscreen_"+house.toLowerCase();
    const reference = ref(this.database, path);
    set(reference, fullscreen);
  }
  addHouseListener(house: string, callback: CallableFunction)
  {
    let path = "auth/allow_"+house.toLowerCase();
    const reference = ref(this.database, path);

    onValue(reference, (snapshot: DataSnapshot) => {
      callback(snapshot);
    });
  }
  addHouseFullscreenListener(house: string, callback: CallableFunction)
  {
    let path = "auth/fullscreen_"+house.toLowerCase();
    const reference = ref(this.database, path);

    onValue(reference, (snapshot: DataSnapshot) => {
      callback(snapshot);
    });
  }
  addDataListener(path: string, callback: CallableFunction)
  {
    const reference = ref(this.database, "data/"+path);

    onValue(reference, (snapshot: DataSnapshot) => {
      callback(snapshot);
    })
  }
  isHouseOpen(house: string, data_callback: CallableFunction)
  {
    let path = "auth/open_"+house.toLowerCase();
    const reference = ref(this.database, path);

    get(reference)
    .then((snapshot) => {
      let data = snapshot.val();
      data_callback(data);
    });
  }
  setHouseOpen(house: string, open: boolean)
  {
    let path = "auth/open_"+house.toLowerCase();
    const reference = ref(this.database, path);

    set(reference, open);
  }

  getAvailableGrades(): string[]
  {
    return ["VI", "VII", "VIII", "IX", "X", "XI", "XII"];
  }
  getAvailableGradesNumber(): number[]
  {
    return [6, 7, 8, 9, 10, 11, 12];
  }
  getAvailableDivisions(grade: string): string
  {
    switch(grade.toUpperCase())
    {
      case "VI": return "G";
      case "VII": return "E";
      case "VIII": return "D";
      case "IX": return "C";
      case "X": return "C";
      case "XI": return "C";
      case "XII": return "C";
    }

    return "G";
  }
  getAvailableDivisionsNumber(grade: number): string
  {
    return this.getAvailableDivisions(this.gradeAsRoman(grade));
  }

  createJSONDownload()
  {
    this.getAllData((snapshot: DataSnapshot) => {
      let json = JSON.stringify(snapshot.val(), null, '\t');
      let a = document.createElement('a');
      a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(json));
      a.setAttribute('download', 'vjhs-voting-data.json');
      a.click();
    });
  }

  gradeAsRoman(grade: number): string
  {
    switch(grade)
    {
      case 6: return "VI";
      case 7: return "VII";
      case 8: return "VIII";
      case 9: return "IX";
      case 10: return "X";
      case 11: return "XI";
      case 12: return "XII";
    }
    return "VI";
  }
  convertToXLSX(callback: CallableFunction)
  {
    this.getAllData((snapshot: DataSnapshot) => {
      let data = snapshot.val();
      let workbook = new excel.Workbook();
      workbook.creator = "Yash Pimpalshende";
      workbook.lastModifiedBy = "Yash Pimpalshende";
  
      let date = new Date(Date.now());
      workbook.created = date;
      workbook.modified = date;
      
      // --- By Class sheet --- //
      const classSheet = workbook.addWorksheet("By Class");
      const classTitleCell = classSheet.getCell('A1');
      classTitleCell.value = "Votes by Classes";
      classTitleCell.font = {
        bold: true,
        name: "Bahnschrift",
        size: 23,
      };
      classSheet.getRow(1).height = 28.5;

      // Second Row
      const secondRow = ["Class", "Division", "Red", "Blue", "Green", "Yellow", "Total"];
      classSheet.getRow(3).values = secondRow;

      // Borders
      classSheet.getRows(3, 29)?.forEach((row) => {
        ["A","B","C","D","E","F","G"].forEach((cellName) => {
          row.getCell(cellName).border = {
            top: {style:'thin'},
            left: {style:'thin'},
            bottom: {style:'thin'},
            right: {style:'thin'}
          };
        });
      });
      
      // Data & Colors
      let rowNumber = 4;
      let color = new Color('rgb(197, 217, 241)');
      let amt = 0.12;
      this.getAvailableGradesNumber().forEach((grade) => {
        let maxDivs = this.getAvailableDivisionsNumber(grade).charCodeAt(0);
        for(let i = "A".charCodeAt(0); i<=maxDivs; ++i)
        {
          let row = classSheet.getRow(rowNumber);
          let div = data['class_votes']['grade_'+this.gradeAsRoman(grade).toLowerCase()]['div_'+String.fromCharCode(i).toLowerCase()];
          row.getCell(1).alignment = {'horizontal':'left'};
          row.getCell(1).value = grade;                  // Grade
          row.getCell(2).value = String.fromCharCode(i); // Division
          row.getCell(3).value = div['red'];             // Red
          row.getCell(4).value = div['blue'];            // Blue
          row.getCell(5).value = div['green'];           // Green
          row.getCell(6).value = div['yellow'];          // Yellow
          row.getCell(7).value = div['total'];           // Total
          for(let x = 1; x<=7; ++x)
          {
            let cell = row.getCell(x);
            cell.fill = {
              type: 'pattern',
              pattern:'solid',
              fgColor:{argb: 'FF'+color.hex().slice(1).toUpperCase()},
            };
          }

          rowNumber++;
        }
        if (rowNumber < 22)
          color = color.darken(amt);
        else
          color = color.lighten(amt);
      });

      // --- By Posts sheet --- //
      const postSheet = workbook.addWorksheet("By Post");
      const postTitleCell = postSheet.getCell('A1');
      postTitleCell.value = "Votes by Posts";
      postTitleCell.font = {
        bold: true,
        name: "Bahnschrift",
        size: 23,
      };
      postSheet.getRow(1).height = 28.5;

      postSheet.getColumn('A').width = 25;
      postSheet.getColumn('B').width = 14.3;
      postSheet.getColumn('C').width = 8.4;
      postSheet.getColumn('E').width = 25;
      postSheet.getColumn('F').width = 14.3;
      postSheet.getColumn('G').width = 8.4;
      postSheet.getColumn('I').width = 25;
      postSheet.getColumn('J').width = 14.3;
      postSheet.getColumn('K').width = 8.4;

      postSheet.getRow(3).height = 21;
      postSheet.getRow(18).height = 21;
      postSheet.getRow(33).height = 21;
      postSheet.getRow(48).height = 21;
      postSheet.getRow(63).height = 21;
      
      let n = 0;
      let colNum = 1;
      color = new Color('rgb(220, 230, 241)');
      rowNumber = 3;
      this.getPosts().forEach((postName) => {
        let row = postSheet.getRow(rowNumber);
        let postData = data['global_votes'][postName];
        row.getCell(colNum).value = postName // Title
        row.getCell(colNum).font = {
          bold: true,
          name: "Bahnschrift",
          size: 15,
        };

        row = postSheet.getRow(rowNumber+1);
        row.getCell(colNum).value = "Name";
        row.getCell(colNum+1).value = "No. of votes";
        row.getCell(colNum+2).value = "Rank";

        let candidates: {name:string, votes:number}[] = [];
        Object.keys(postData).forEach((key) => {
          if(key=="total")  return;
          candidates.push({name: key, votes: postData[key]});
        });
        candidates.sort((a,b) => {
          if(a.name == "nota")  return 1;
          else if (b.name == "nota")  return -1;
          return (b.votes - a.votes);
        });

        for(let i=0; i<11; ++i)
        {
          row = postSheet.getRow(rowNumber+i+2);
          if(i>=candidates.length)
          {
            row.getCell(colNum).value = "-";
            row.getCell(colNum).alignment = {'horizontal':'center'};
            continue;
          }
          
          if(candidates[i].name == "nota")
            candidates[i].name = "NOTA";
          row.getCell(colNum).value = candidates[i].name;
          row.getCell(colNum+1).value = candidates[i].votes;

          if(candidates[i].name == "NOTA")
          {
            row.getCell(colNum+2).value = " - ";
            row.getCell(colNum+2).alignment = {'horizontal':'center'}
          }
          else
            row.getCell(colNum+2).value = i+1;
        }
        row = postSheet.getRow(rowNumber+13);
        row.getCell(colNum).value = "Elected Candidate: "+candidates[0].name;
        row.getCell(colNum).font = {
          bold: true,
        }
        
        let colHex = 'FF'+color.hex().slice(1).toUpperCase();
        for(let i=0; i<=13; ++i)
        {
          row = postSheet.getRow(rowNumber+i);

          if(i==0)
          {
            row.getCell(colNum).border = {top: {style:'thin'},left: {style:'thin'}};
            row.getCell(colNum+1).border = {top: {style:'thin'},bottom: {style:'thin'}};
            row.getCell(colNum+2).border = {top: {style:'thin'},right: {style:'thin'}};
            for(let x=0; x<3; ++x)
              row.getCell(colNum+x).fill = {type: 'pattern',pattern:'solid',fgColor:{argb: colHex}};
            continue;
          }
          else if(i==13)
          {
            row.getCell(colNum).border = {bottom: {style:'thin'},left: {style:'thin'}};
            row.getCell(colNum+1).border = {bottom: {style:'thin'},top: {style:'thin'}};
            row.getCell(colNum+2).border = {bottom: {style:'thin'},right: {style:'thin'}};
            for(let x=0; x<3; ++x)
              row.getCell(colNum+x).fill = {type: 'pattern',pattern:'solid',fgColor:{argb: colHex}};
            continue;
          }


          for(let x=0; x<3; ++x)
          {
            row.getCell(colNum+x).border = {
              top: {style:'thin'},
              left: {style:'thin'},
              bottom: {style:'thin'},
              right: {style:'thin'}
            };
            row.getCell(colNum+x).fill = {
              type: 'pattern',
              pattern:'solid',
              fgColor:{argb: colHex},
            };
          }
        }

        if (n==2)
        {
          colNum = 1;
          rowNumber += 15;
          n = 0;
        }
        else
        {
          colNum+=4;
          n++;
        }
      });

      callback(workbook);
    });
  }
  createXLSXDownload()
  {
    this.convertToXLSX((workbook: excel.Workbook) => {
      workbook.xlsx.writeBuffer().then((buffer: excel.Buffer) => {
        let blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, 'vjhs-voting-data.xlsx');
      });
    });
  }
}
