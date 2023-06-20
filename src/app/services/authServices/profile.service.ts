import { Injectable } from '@angular/core';
import { securityService } from './security';
import { UserService } from '../userServices/user.service';

@Injectable({ providedIn: 'root' })
export class ProfileService {
    tokenKey: string;

    constructor(
        private userService: UserService,
        private secureService: securityService
    ) {
        this.tokenKey = 'local';
    }

    DeleteLocalToken() {
        localStorage.clear();
    }

    StoreToken(authToken: string) {
        localStorage.setItem(this.tokenKey, authToken);
    }

    GetToken(): string | undefined {
        const token = localStorage.getItem(this.tokenKey);
        if (token) {
            return token;
        } else {
            return undefined;
        }
    }
}
