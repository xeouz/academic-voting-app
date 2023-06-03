import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-house-page',
  templateUrl: './house-page.component.html',
  styleUrls: ['./house-page.component.css']
})
export class HousePageComponent implements OnInit {
  houseName = "";
  houseNameCapitalized = "";
  houseText = "";
  houseBackgroundImage = "";
  houseColor = "#FFB000";

  constructor(private router:Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.houseName = this.activatedRoute.snapshot.paramMap.get('house')!;
    this.houseNameCapitalized = this.houseName.charAt(0).toUpperCase() + this.houseName.slice(1);

    if(!["red", "blue", "green", "yellow"].includes(this.houseName))
    {
      this.router.navigate(['']);
    }
    switch(this.houseName)
    {
      case "red": this.houseColor="#FF6770"; this.houseBackgroundImage+="red-bg"; this.houseText="Himalaya"; break;
      case "blue": this.houseColor="#6CA0DC"; this.houseBackgroundImage+="blue-bg"; this.houseText="Nilgiri"; break;
      case "green": this.houseColor="#3CD070"; this.houseBackgroundImage+="green-bg"; this.houseText="Sahyadri"; break;
      case "yellow": this.houseColor="#DFAF24"; this.houseBackgroundImage+="yellow-bg"; this.houseText="Vindhaya"; break;
      default: break;
    }
    // this.houseText = this.houseText.toUpperCase();
    this.houseBackgroundImage+=".png";
  }
}
