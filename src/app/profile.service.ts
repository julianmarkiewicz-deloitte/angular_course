import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Profile {
  name: string;
  age: number;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);

  getProfile() {
    return this.http.get<Profile>('http://localhost:3000/profile');
  }
}
