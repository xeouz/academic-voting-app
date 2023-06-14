import { Injectable } from '@angular/core';
import { ref, Storage, getDownloadURL, uploadBytes } from '@angular/fire/storage';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VjhsStorageService {
  private readonly storage: Storage = inject(Storage);

  constructor(private http: HttpClient) { }

  private is_retrieved = false;
  studentList: any;
  async retrieveStudentList(on_retrieved: CallableFunction)
  {
    if(this.is_retrieved == true)
    {
      on_retrieved();
      return;
    }
    const reference = ref(this.storage, "student-list.json");
    const url = new URL(await getDownloadURL(reference));

    fetch(url)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      this.is_retrieved = true;
      this.studentList = data;
      on_retrieved();
    });
  }

  async getImageURL(path: string)
  {
    const reference = ref(this.storage, 'images/'+path);
    try
    {
      return await getDownloadURL(reference);
    }
    catch
    {
      return '';
    }
  }

  async updatePassword(type: string, password: string)
  {
    switch(type)
    {
      case "auth": this.studentList["Password"] = password; break;
      case "data": this.studentList["DataPassword"] = password; break;
      default: return;
    }

    let jsonString = JSON.stringify(this.studentList);
    let blob = new Blob([jsonString], {type: 'application/json'});

    let fileRef = ref(this.storage, "student-list.json");
    await uploadBytes(fileRef, blob);
  }
}
