import { Injectable } from '@angular/core';
import { ref, Storage, getDownloadURL } from '@angular/fire/storage';
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

  async getImageURL(imagePath: string): Promise<string>
  {
    const reference = ref(this.storage, "images/"+imagePath);
    const url = await getDownloadURL(reference);

    return url;
  }
}
