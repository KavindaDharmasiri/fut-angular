import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgForOf} from '@angular/common';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient,private auth: AuthService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.auth.loadUsers().subscribe((res: any) => {
      this.users = res
    });
  }

  toggleStatus(user: any) {
    const newStatus = user.active ? 'block' : 'unblock';
    this.http.put(`/api/admin/users/${user.id}/${newStatus}`, {})
      .subscribe(() => this.loadUsers());
  }
}
